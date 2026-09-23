import type { Duration } from "../../util/formatDuration"

export default [
    {
        name: "Studio Marlo",
        duration: {
            start: "2021-11-01"
        } as Duration,
        links: [
            { href: "https://www.instagram.com/studio0_0marlo/", label: "Instagram", platform: "instagram" },
            { href: "https://github.com/tuckbick/drawbot", label: "GitHub", platform: "github" }
        ],
        description: [
            "I've only recently started contributing to the Instagram account, but this is something I've been having fun with on-and-off for the past several years. At the end of 2021 I grew an interest in pen plotting, but immediately felt constrained by the size of the smaller and more inexpensive machines. I decided I would try to design and assemble my own large format plotter, which ended up being a multi-year process of prototyping while also mixing in some time to actually use the machine and create some interesting artwork.",
            "During an employment sabatical in 2026, I took some time to redesign the circuit board and electronics, while also upgrading to the firmware to support some more advanced capabilities. During this period I also participated in a local art fair to showcase my work — it was a big success!"
        ]
    },
    {
        name: "Picardy Learning",
        role: "Staff Engineer",
        duration: {
            start: "2014-06-01",
            end: "2022-04-01"
        } as Duration,
        links: [
            { href: "https://picardylearning.com/", label: "Homepage", platform: "www" },
            { href: "https://github.com/picardy", label: "GitHub", platform: "github" }
        ],
        description: ["Picardy is an online interactive platform for developing theory and musicianship skills for teachers and students. What started as a small project between friends, grew into a much larger and more comprehensive initiative, and is now something I'm proud to say is used in classrooms and homes across the world."]
    }
]