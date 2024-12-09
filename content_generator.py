# Install necessary libraries (uncomment if running in a new environment)
# !pip install flask transformers torch

from flask import Flask, request, jsonify
import torch
from transformers import GPT2LMHeadModel, GPT2Tokenizer

app = Flask(__name__)

# Load pre-trained model and tokenizer
model_name = 'gpt2'
tokenizer = GPT2Tokenizer.from_pretrained(model_name)
model = GPT2LMHeadModel.from_pretrained(model_name, pad_token_id=tokenizer.eos_token_id)

@app.route('/generate-content', methods=['POST'])
def generate_content():
    data = request.json
    description = data.get('description', '')
    keywords = data.get('keywords', '')
    tone = data.get('tone', 'informative')
    length = data.get('length', 150)

    prompt = f"Write a {tone} message about the following: {description}. Include keywords: {keywords}. Aim for a length of {length} words."
    
    input_ids = tokenizer.encode(prompt, return_tensors='pt')
    max_length = length + len(input_ids[0])
    
    with torch.no_grad():
        output = model.generate(
            input_ids, 
            max_length=max_length, 
            num_return_sequences=1,
            no_repeat_ngram_size=2,
            do_sample=True,
            top_k=50,
            top_p=0.95,
            temperature=0.7
        )
    
    generated_content = tokenizer.decode(output[0], skip_special_tokens=True)
    return jsonify({"content": generated_content})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
