# research-ai-genre-classification

Welcome! The goal of this project is to fine-tune a pre-trained AST (Audio Spectrogram Transformer)
to predict the genre of a song based on an opinionated dataset of mine. The idea behind was to
automate the process of sorting freshly downloaded music into folders based on the genre. That's why
it should be very accurate, like 95 % accuracy.

Experiments with different setups have been done. They show how different methods influence the
prediction performance. Although the results were quite good, the best model only reached 90 %
accuracy, which is too bad for my use case, at least in production, and I will use a manual approach
for now. At the end of this project, the performance issues of the model will be analyzed in detail
and why it is hard to reach 95 % accuracy.

During the tests I also realized some important things about fine-tuning transformer models, which
you can read inside the notebooks. They are numbered, so you can read through them in the correct
order.

## Contents

1. [Preprocessing](./src/1-preprocessing.ipynb)
2. [Training](./src/2-training.ipynb)
3. [Balanced Dataset](./src/3-balanced-dataset.ipynb)
4. [Song Dataset](./src/4-song-dataset.ipynb)
5. [Training Songs](./src/5-training_songs.ipynb)
6. [Results](./src/6-results.ipynb)
