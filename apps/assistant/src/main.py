import speech_recognition as sr

from commands import execute

keyword = "Sophia"


def convert_speech_to_text():
    recognizer = sr.Recognizer()

    while True:
        with sr.Microphone() as source:
            print("Listening...")
            recognizer.adjust_for_ambient_noise(source)
            audio = recognizer.listen(source)

            try:
                recognized_text = recognizer.recognize_google(audio)
                print("Recognized: {}".format(recognized_text))

                if recognized_text.lower().startswith(keyword.lower()):
                    command = recognized_text[len(keyword) + 1:].strip()
                    execute(command)
            except sr.UnknownValueError:
                print("Speech Recognition could not understand audio")
            except sr.RequestError as e:
                print("Error with the speech recognition service; {0}".format(e))


if __name__ == "__main__":
    convert_speech_to_text()
