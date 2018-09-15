from sense_hat import SenseHat
import geocoder
import socket
import ipaddress
import pytemperature

location = geocoder.ip('me')
lat = location.lat
lng = location.lng

sense = SenseHat()
sense.clear()

temp = sense.get_temperature()
humidity = sense.get_humidity()
pressure = sense.get_pressure()

address = socket.gethostname()

print("Latitude: " + str(lat))
print("Longitude: " + str(lng))
print("Temperature (Fahrenheit): " + str(pytemperature.c2f(temp)))
print("Humidity (%): " + str(humidity))
print("Pressure (PSI): " + str(pressure/68.9476))
print("Hostname: " + str(address))
print([l for l in ([ip for ip in socket.gethostbyname_ex(socket.gethostname())[2] if not ip.startswith("127.")][:1], [[(s.connect(('8.8.8.8', 53)), s.getsockname()[0], s.close()) for s in [socket.socket(socket.AF_INET, socket.SOCK_DGRAM)]][0][1]]) if l][0][0])



