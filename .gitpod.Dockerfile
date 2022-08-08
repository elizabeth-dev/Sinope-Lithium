FROM gitpod/workspace-full

USER gitpod

# Oh My Zsh
RUN sudo chsh -s $(which zsh) $(whoami)
RUN sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" "--unattended"
## RUN curl -fsSLo $HOME/.oh-my-zsh/custom/themes/elizabeth.zsh-theme https://raw.github.com/elizabeth-dev/dotfiles/main/.oh-my-zsh/custom/themes/elizabeth.zsh-theme
## RUN curl -fsSLo $HOME/.zshrc https://raw.github.com/elizabeth-dev/dotfiles/main/.zshrc

# Zsh autosuggestions
RUN echo 'deb http://download.opensuse.org/repositories/shells:/zsh-users:/zsh-autosuggestions/xUbuntu_20.04/ /' | sudo tee /etc/apt/sources.list.d/shells:zsh-users:zsh-autosuggestions.list && curl -fsSL https://download.opensuse.org/repositories/shells:zsh-users:zsh-autosuggestions/xUbuntu_20.04/Release.key | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/shells_zsh-users_zsh-autosuggestions.gpg > /dev/null

# GCloud CLI
RUN echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] http://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list && curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key --keyring /usr/share/keyrings/cloud.google.gpg add -

# Android SDK
ENV ANDROID_HOME /opt/android-sdk
ENV JAVA_HOME /home/gitpod/.sdkman/candidates/java/8.332.08.1-amzn
ENV PATH $JAVA_HOME/bin:${ANDROID_HOME}/cmdline-tools/latest/bin:${ANDROID_HOME}/platform-tools:${PATH}

RUN bash -c "source ~/.sdkman/bin/sdkman-init.sh && \
                sdk install java 8.332.08.1-amzn"

RUN cd /tmp && \
    curl -fsSLo /tmp/commandline-tools.zip https://dl.google.com/android/repository/commandlinetools-linux-8512546_latest.zip && \
    #sudo mkdir -p ${ANDROID_HOME}/cmdline-tools && \
    sudo unzip -q /tmp/commandline-tools.zip && \
    #sudo mv cmdline-tools ${ANDROID_HOME}/cmdline-tools/latest && \
    rm /tmp/commandline-tools.zip && \
    sudo mkdir -p ${ANDROID_HOME}

RUN sudo chown -R gitpod:gitpod /opt/android-sdk && sudo chmod -R 755 ${ANDROID_HOME}

RUN cd /tmp/cmdline-tools/bin && \
    yes | ./sdkmanager --licenses --sdk_root=${ANDROID_HOME} && \
    yes | ./sdkmanager --update --channel=3 --sdk_root=${ANDROID_HOME} && \
    yes | ./sdkmanager --sdk_root=${ANDROID_HOME} \
    "platforms;android-33" \
    "build-tools;33.0.0" \
    "cmdline-tools;latest" \
    "ndk;25.0.8775105" \
    "tools" \
    "skiaparser;3" && \
    sudo rm -rf /tmp/cmdline-tools

# Install packages
RUN sudo install-packages zsh-syntax-highlighting zsh-autosuggestions google-cloud-cli
