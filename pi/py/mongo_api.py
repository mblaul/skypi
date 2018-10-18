import requests

def pushdata(host,temperature,humidity,lat,lng,pressure,city, state, zip_code, country, wind,wind_direction):

    with open('id.key', 'r') as myfile:
    device_key = myfile.read()
    
    url = "http://18.235.27.33/api/weather/log"

    payload = ("""source=%s&device=%s&temperature=%f&humidity=%f&latitude=%f&longitude=%f&pressure=%f&city=%s&state=%s&zipcode=%f&country=%s&wind=%f&winddirection=%s"""
    % (host, device_key, temperature, humidity, lat, lng, pressure, city, state, zip_code, country, wind, wind_direction))

    headers = {'Content-Type': 'application/x-www-form-urlencoded'}

    response = requests.request("POST", url, data=payload, headers=headers)

    print(response.text)
