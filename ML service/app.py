from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
import urllib.request
from PIL import Image
import os
import random
import string

app = Flask(__name__)

labels = ['fresh apples', 'fresh banana', 'fresh oranges', 'rotten apples', 'rotten banana', 'rotten oranges']
model = tf.keras.models.load_model('./Fruits_Recognation.h5')
port = int(os.environ.get("PORT", 8080))

@app.route('/predict', methods=['POST'])
def predict_image():
    try:
        random_name = ''.join(random.choices(string.ascii_letters + string.digits, k=10))+".jpg"
        image_url = request.json['url']
        urllib.request.urlretrieve(image_url, random_name)
        img = tf.keras.utils.load_img(random_name, target_size=(100, 100))
        img_array = tf.keras.utils.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)

        predictions = model.predict(img_array)
        score = tf.nn.softmax(predictions[0])
        predicted_label = labels[np.argmax(score)].split()
        
        os.remove(random_name)
        return jsonify({"fruit" : predicted_label[1], "predict" : predicted_label[0]})
    except Exception as e:
        if os.path.exists(random_name):
            os.remove(random_name)
        return jsonify({'error': str(e)})
    

if __name__ == '__main__':
    app.run(host='0.0.0.0',port= port)