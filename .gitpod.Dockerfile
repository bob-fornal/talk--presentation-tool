FROM gitpod/workspace-full-vnc

USER gitpod

RUN glink="https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb" 
RUN sudo apt-get install -q "$glink"
RUN sudo install-packages libasound2-dev libgtk-3-dev libnss3-dev
RUN sudo ln -srf /usr/bin/google-chrome /usr/bin/chromium

ENV QTWEBENGINE_DISABLE_SANDBOX=1
