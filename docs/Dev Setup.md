# Dev Setup

My setup looks like this:

```mermaid
graph LR
  dev["Dev<br/>(SonarLint + ESLint)"]
  git["Git"]
  github["GitHub"]

  gitlab["GitLab<br/>Run Pipeline"]
  sonarqube["SonarQube"]

  docker-compose["Docker Compose"]

  dev --> git --> gitlab -->|mirror| github
  gitlab -->|deploy with| docker-compose
  gitlab -->|inspect with| sonarqube --> dev
```

<button type="button" class="custom-button" @click="fullscreen">Fullscreen</button>

<script setup>import {useData} from "vitepress";

const { isDark } = useData();

const fullscreen = () => {
    const mermaid = document.querySelector("main div > svg");
    mermaid.style["background-color"] = isDark.value ? "#1e1e20" : "white";
    mermaid.requestFullscreen();
};
</script>

See the gitlab pipeline here: [gitlab-ci.yml](../.gitlab-ci.yml)
