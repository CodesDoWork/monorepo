---
layout: page
---
<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from "vitepress/theme";

const members = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/45438553?v=4',
    name: 'Justin Konratt',
    title: 'Software Developer 🚀',
    links: [
      { icon: 'github', link: 'https://github.com/CodesDoWork' },
      { icon: 'instagram', link: 'https://instagram.com/justinkonratt' }
    ]
  },
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      About
    </template>
    <template #lead>
      I'm a software developer from Germany and my mindset looks like this:<br />
        <br />
        <li>You never know where your limit is!</li>
        <li>Constantly learning and growing!</li>
        <li>Work smarter not harder!</li>
        <li>For a creative and beautiful future!</li>
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers
    :members="members"
  />
</VPTeamPage>
