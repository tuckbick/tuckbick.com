import type { Duration } from '../../util/formatDuration'

export default [
    {
        company: "Expedia Group",
        role: "Senior Software Engineer",
        duration: {
            start: "2020-09-01",
            end: "2026-01-01"
        } as Duration,
        location: ["Denver, CO", "Chicago, IL"],
        description: [
            "Re-architected core backend APIs and services to support decoupled microservices across Expedia's global travel products.",
            "Led the technical modernization of the \"Change Booking\" flow, unifying complex downstream flight and hotel logic into clean, reliable APIs.",
            "Migrated legacy landing pages from a monolithic CMS to a decoupled React and GraphQL architecture.",
            "Built Datadog and Splunk dashboards to monitor live system performance, using operational data to safely decommission legacy code.",
            "Designed plugin extensions to pass user context and personalization data through backend APIs, preparing the infrastructure for AI-driven search and content curation.",
            "Engineered tools for internal data scientists to configure, monitor, and run large-scale data processing jobs."
        ]
    },
    {
        company: 'Vrbo',
        role: 'Staff Software Engineer',
        duration: {
            start: '2019-05-01',
            end: '2020-09-01'
        } as Duration,
        location: ['Austin, TX', 'Denver, CO'],
        description: [
            "Managed and expanded \"Catalyst,\" Vrbo's shared Node.js platform, building plugins and core tooling used by product engineering teams across the company.",
            "Built out production monitoring integrations for third-party platforms like Datadog and Grafana.",
            "Worked directly with product teams to find common technical bottlenecks, abstracting those patterns into shared platform libraries to accelerate development."
        ]
    },
    {
        company: 'HomeAway',
        role: 'Senior UI Engineer',
        duration: {
            start: '2014-03-01',
            end: '2019-05-01'
        } as Duration,
        location: ['Austin, TX'],
        description: [
            "Steered architectural work on \"Catalyst,\" HomeAway's shared Node.js framework, ensuring standard patterns and easy service integrations across teams.",
            "Refactored legacy code across Search, Listing, and Traveler Inbox applications, driving backend and performance optimizations that made the homepage Google's #1 fastest travel site.",
            "Taught technical workshops at HomeAway University to onboard new engineers and promote platform best practices."
        ]
    },
    {
        company: 'OneID',
        role: 'UX Developer',
        duration: {
            start: '2013-06-01',
            end: '2014-03-01'
        } as Duration,
        location: ['Austin, TX'],
        description: [
            "Built developer-facing REST APIs, documentation sites, user dashboards, and browser extensions for identity authentication.",
            "Leveraged open-source frameworks like AngularJS, Backbone.js, and Node.js to accelerate delivery timelines while maintaining robust code quality."
        ]
    },
    {
        company: 'T3',
        role: 'Developer',
        duration: {
            start: '2012-12-01',
            end: '2013-06-01'
        } as Duration,
        location: ['Austin, TX'],
        description: [
            "Built and maintained localized web services and internal localization management tools for enterprise clients like UPS and 7-Eleven."
        ]
    },
    {
        company: 'Optaros',
        role: 'Associate UX Consultant',
        duration: {
            start: '2011-09-01',
            end: '2012-12-01'
        } as Duration,
        location: ['Austin, TX'],
        description: [
            "Developed web applications and supporting iOS software for commercial clients like Pfizer and Macy's."
        ]
    }
]