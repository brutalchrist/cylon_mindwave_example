#!/usr/local/opt/python/bin/python2.7

import cv2
import sys

from ar_markers.hamming.detect import detect_markers

if __name__ == '__main__':
    debug = False
    if "-d" in sys.argv:
        debug = True

    # for line in sys.stdin:
    capture = cv2.VideoCapture(0)

    if capture.isOpened():
        frame_captured, frame = capture.read()
    else:
        frame_captured = False
    while frame_captured:
        markers = detect_markers(frame)
        for marker in markers:
            marker.highlite_marker(frame)
            print marker.id
            sys.stdout.flush()
            
        if debug:
            cv2.imshow('Test Frame', frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
        frame_captured, frame = capture.read()

    # When everything done, release the capture
    capture.release()
    cv2.destroyAllWindows()

