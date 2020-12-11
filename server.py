from flask import Flask, request, Response, render_template, jsonify
import requests

# app = Flask(__name__)
app = Flask(__name__, static_url_path='/static')
# app = Flask(__name__, static_folder='./static/')
# app = Flask(__name__, static_folder='./test/')

@app.route("/gpt2", methods=["POST"])
def gpt2():
    # print('request', request)
    # print('requests', requests)
    # print('request.form', request.form)

    # str1={}
    # i=0
    form1 = request.form.to_dict()
    print('form1',form1)
    # form2 = request.form.to_dict().values()[0]
    # print('form2',form2)
    # print('form1[context]',form1[0])
    # formlist = form1.keys()
    for key in form1.keys():
        print(key, ":",form1[key])
    for key in form1.keys():
        # str1 = key
        # print('str ' ,str1)
        if key== 'contextg':
            print('key',key)
        
    context = request.form['context']

    # model = request.form['model']
    # print('model',model)

    # length = request.form['length']
    # print('length', length)


    # contextg += " hi"

    # url = models[model]
    url = "https://main-gpt2-debate-gmlee329.endpoint.ainize.ai/gpt2-debate/long"
    # print('url', url)
    length = 20
    
    data = {
        "text": context,
        "num_samples": 1,
        "length": length
    }
    print('data : ', data)
    response = requests.post(url, data=data)
    print('**response',response)
    res = response.json()
    print('**** res : ',res)
    
    return res

@app.route("/")
def main():
    print("start2")
    return render_template("index.html")


# Health Check
@app.route("/healthz", methods=["GET"])
def healthCheck():
    return "", 200


if __name__ == "__main__":
    from waitress import serve
    print("start")
    serve(app, host='0.0.0.0', port=8080)