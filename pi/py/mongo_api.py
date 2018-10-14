import requests

def pushdata(host,temperature,humidity,lat,lng,pressure,wind,wind_direction):
    
    url = "http://18.235.27.33/api/weather/log"

    #Payload to push to MongoDB using % (String Formatting Operator)
    payload = ("source=%s&device=5b778422c1381d18a8bd003e&temperature=%f&humidity=%f&latitude=%f&longitude=%f&pressure=%f&wind=%f&winddirection=%s"
    % (host,temperature,humidity,lat,lng,pressure,wind,wind_direction))

    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    response = requests.request("POST", url, data=payload, headers=headers)

    print(response.text)