from flask import Flask, render_template, request, jsonify
import serial

app = Flask(__name__)

# Configuration de la communication série avec l'Arduino
arduino_port = '/dev/tty.usbmodem14101'  # Modifier selon le port série de votre Arduino
arduino_baudrate = 9600
ser = serial.Serial(arduino_port, arduino_baudrate, timeout=1)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/control', methods=['POST'])
def control():
    data = request.get_json()
    stepsX = data.get('x')
    stepsY = data.get('y')
    stepsZ = data.get('z')
    typePlante = data.get('typePlante')
    # Vous pouvez ajouter d'autres champs ici si nécessaire

    if stepsX and stepsY and stepsZ and typePlante:
        command = f"{typePlante} {stepsX} {stepsY} {stepsZ}\n"
        ser.write(command.encode())
        
    return jsonify({'status': 'OK'})

if __name__ == '__main__':
    app.run(port=8000)
