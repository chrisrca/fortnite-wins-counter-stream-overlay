import pytesseract
import pyautogui
import time

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
while True:
    img = pyautogui.screenshot(region=(365, 240, 158, 25))
    text = pytesseract.image_to_string(img)
    if "AO Ping Player" in text:
        print("Win")
        with open('wins.txt', 'r') as f:
            current_wins = int(f.read())
        new_wins = current_wins + 1
        with open('wins.txt', 'w') as f:
            f.write(str(new_wins))
        time.sleep(10)
    time.sleep(3)
    