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
            "This is something I've been having fun with on-and-off for the past several years. At the end of 2021 I grew an interest in pen plotting, but immediately felt constrained by the size of the smaller and more inexpensive machines. I decided to try designing and building my own large-format plotter. This ended up being a multi-year process of prototyping while also mixing in some time to actually use the machine and create some interesting artwork.",
            "During an employment sabatical in 2026, I redesigned the circuit board and electronics, while also upgrading the firmware to support some more advanced capabilities. I also took this opportunity to participate in a local art fair to showcase my work — it was a big success!"
        ],
        images: [
            "projects/marlo/project0.jpg",
            "projects/marlo/project1.jpg",
            "projects/marlo/project2.jpg",
            "projects/marlo/project3.jpg",
            "projects/marlo/project4.jpg"
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
        description: ["Picardy is an online interactive platform for developing theory and musicianship skills for teachers and students. What started as a small project between friends, grew into a much larger and more comprehensive initiative, and is now something I'm proud to say is used in classrooms and homes across the world."],
        images: [
            "projects/picardy/project0.jpg",
            "projects/picardy/project1.jpg",
            "projects/picardy/project2.jpg"
        ]
    }
]