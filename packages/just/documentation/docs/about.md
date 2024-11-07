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
    avatar: 'https://gravatar.com/avatar/668744192e2a341b5253f99980181011?size=256',
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
        <li>For a creative and beautiful future!</li>
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers
    :members="members"
  />
</VPTeamPage>
