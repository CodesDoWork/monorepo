FROM jetbrains/teamcity-agent:2022.10-linux-sudo

RUN curl -sL https://deb.nodesource.com/setup_19.x -o /tmp/nodesource_setup.sh
RUN sudo bash /tmp/nodesource_setup.sh
RUN sudo apt-get install -y nodejs

USER buildagent
