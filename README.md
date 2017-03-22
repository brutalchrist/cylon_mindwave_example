# Mindwave NeuroSky + Arduino + OpenCV + CylonJS 

## Requirements

### Software

* Node
* Python
  * OpenCV module
  * [python-ar-marker module](https://github.com/DebVortex/python-ar-markers/)

### Hardware

* [NeuroSky Mindwave Mobile](https://www.amazon.com/NeuroSky-MindWave-Mobile-BrainWave-Starter/dp/B00B8BF4EM/ref=sr_1_1?ie=UTF8&qid=1490126253&sr=8-1&keywords=neurosky+mindwave+mobile)
* [Arduino](https://store.arduino.cc/product/A000066)
  * [Rele module](http://www.ebay.com/itm/5V-2-Two-Channel-Relay-Module-With-optocoupler-for-Arduino-PIC-ARM-DSP-AVR-/140764956257?hash=item20c63ec661:g:OQMAAOSwZQRYfeVT)
* [Webcam](https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=webcam)

## Setup

### Hardware

#### Arduino

![Diagram](http://1.bp.blogspot.com/-9bfhA-cVqGU/UPVxJZKwN5I/AAAAAAAACss/2NbbH16as7M/s1600/relee_arduino.jpg)

#### Mindwave Hack

![Mindwave Hack](http://i.imgur.com/pO5DhCT.jpg)

### Software

```bash
$ git clone git@github.com:brutalchrist/cylon_mindwave_example.git
$ cd cylon_mindwave_example/
```

Generate a marker and print it

```bash
$ mkdir marker_images
$ ar_markers_generate_marker 666
$ open marker_images/marker_666.png
```

Setup camera (`python/markerdetect.py`)

```python
capture = cv2.VideoCapture(ID_CAMERA)
```

Test markerdetect

```bash
$ python python/markerdetect.py -d
```

Setup arduino devices (`arduino_devices.py`)

```javascript
marker_id: {
	name: descriptive_device_name,
	action: function with action of device
},
```

Setup Cylon connections (`Robot.js`)

```javascript
connections: {
	neurosky: {
		adaptor: "neurosky",
		port: '/dev/YOUR_MINDWAVE_PORT' 
	},
	arduino: {
		adaptor: 'firmata',
		port: '/dev/YOUR_ARDUINO_PORT' 
	}
}
```

And you [arduino devices](https://cylonjs.com/documentation/platforms/arduino/)

```javascript
devices: {
	headset: { driver: "neurosky", connection: 'neurosky'},
	descriptive_device_name: {
		driver: CYLON_DRIVERr,
		pin: PIN,
		connection: 'arduino'
	}
}
```

Add marker to device

![Marker Device](http://i.imgur.com/PcGcEAH.jpg)

Install node dependencies with yarn 🎉 (or npm 🤐)

```bash
$ yarn install 
```

## Run!

```bash
$ node Robot.js
```

![Light](https://media.giphy.com/media/l1KVbVolyj8ptkn0k/giphy.gif)
