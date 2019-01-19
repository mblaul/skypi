import requests

def pushdata(host,temperature,humidity,lat,lng,pressure,city, state, zip_code, country, wind,wind_direction,percipitation,description):

    with open('/home/skypi/skypi/id.key', 'r') as myfile:
        device_key = myfile.read()
    
    url = "http://18.235.27.33/api/weather/log"

    payload = ("""source=%s&device=%s&temperature=%s&humidity=%s&latitude=%f&longitude=%f&pressure=%s&city=%s&state=%s&zipcode=%s&country=%s&wind=%f&winddirection=%s&precipitation=%s&description=%s"""
    % (host, device_key, temperature, humidity, lat, lng, pressure, city, state, zip_code, country, wind, wind_direction,percipitation,description))

    headers = {'Content-Type': 'application/x-www-form-urlencoded'}

    response = requests.request("POST", url, data=payload, headers=headers)

    print(response.text)
