import type { Duration } from "../../util/formatDuration"
import type { GalleryImage } from "../../components/Gallery/Gallery"
import type { IconName } from "../../components/Icon/Icon"

export interface Project {
    name: string
    role?: string
    duration: Duration
    links: { href: string, label: string, platform: IconName }[]
    description: string[]
    images?: GalleryImage[]
}

const projects: Project[] = [
    {
        name: "Backdate",
        duration: {
            start: "2026-10-02"
        },
        links: [
            { href: "https://backdate.tuckbick.com", label: "Homepage", platform: "www" },
            { href: "https://github.com/tuckbick/backdate", label: "GitHub", platform: "github" }
        ],
        description: [
            "Backdate is a work in progress. The idea came about while my Dad was suffering from Parkinson's disease. As dementia took hold, I realized how much he had forgotten or misremembered, and I didn't want my own memories to fall by the wayside. I'm not great at keeping a day-to-day journal, though.",
            "It's a place to write down your memories, a bit like journaling but focused on past events. It provides tools to organize them by date, people, places, and other metadata, along with photos and other relics."
        ]
    },
    {
        name: "Copy as Markdown",
        duration: {
            start: "2026-11-09",
            end: "2026-11-09"
        },
        links: [
            { href: "https://copy-as-markdown.tuckbick.com", label: "Homepage", platform: "www" },
            { href: "https://github.com/tuckbick/copy-as-markdown", label: "GitHub", platform: "github" }
        ],
        description: [
            "While applying for jobs, I often needed to copy text from a webpage into a Markdown document. I wanted to keep the original formatting while converting it to Markdown syntax, so I built this tool to make that easier."
        ]
    },
    {
        name: "Studio Marlo",
        duration: {
            start: "2021-11-01"
        },
        links: [
            { href: "https://www.instagram.com/studio0_0marlo/", label: "Instagram", platform: "instagram" },
            { href: "https://github.com/tuckbick/drawbot", label: "GitHub", platform: "github" }
        ],
        description: [
            "This is something I've been having fun with on-and-off for the past several years. At the end of 2021 I grew an interest in pen plotting, but immediately felt constrained by the size of the smaller and more inexpensive machines. I decided to try designing and building my own large-format plotter. This ended up being a multi-year process of prototyping while also mixing in some time to actually use the machine and create some interesting artwork.",
            "During an employment sabbatical in 2026, I redesigned the circuit board and electronics, while also upgrading the firmware to support some more advanced capabilities. I also took this opportunity to participate in a local art fair to showcase my work — it was a big success!"
        ],
        images: [
            { src: "images/projects/marlo/project0.jpg", width: 640, height: 640, alt: "Plotter artwork of faceted, rock-like forms drawn as dense blue and green grid lines" },
            { src: "images/projects/marlo/project1.jpg", width: 640, height: 640, alt: "Black and white plotter artwork of a lumpy, star-shaped form built from fine wireframe lines" },
            { src: "images/projects/marlo/project2.jpg", width: 640, height: 469, alt: "The large-format pen plotter: a black aluminum frame with a moving gantry drawing on a whiteboard-sized sheet" },
            { src: "images/projects/marlo/project3.jpg", width: 640, height: 640, alt: "The redesigned green plotter circuit board with an ESP32 module, stepper drivers with red heat sinks, capacitors and terminal blocks" },
            { src: "images/projects/marlo/project4.jpg", width: 640, height: 399, alt: "A person seated in the Studio Marlo booth at a local art fair, surrounded by framed plotter prints" }
        ]
    },
    {
        name: "Picardy Learning",
        role: "Staff Engineer",
        duration: {
            start: "2014-06-01",
            end: "2022-04-01"
        },
        links: [
            { href: "https://picardylearning.com/", label: "Homepage", platform: "www" },
            { href: "https://github.com/picardy", label: "GitHub", platform: "github" }
        ],
        description: ["Picardy is an online interactive platform for developing theory and musicianship skills for teachers and students. What started as a small project between friends, grew into a much larger and more comprehensive initiative, and is now something I'm proud to say is used in classrooms and homes across the world."],
        images: [
            { src: "images/projects/picardy/project0.jpg", width: 640, height: 441, alt: "Six members of the Picardy team smiling together at the Picardy conference booth" },
            { src: "images/projects/picardy/project1.jpg", width: 640, height: 423, alt: "Two Picardy team members seated at the Picardy booth with laptops showing the platform" },
            { src: "images/projects/picardy/project2.jpg", width: 640, height: 530, alt: "Picardy lesson screen asking the learner to select the key signature for C major from four options" }
        ]
    }
]

export default projects
