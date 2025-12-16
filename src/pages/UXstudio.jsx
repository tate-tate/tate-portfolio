import Wrapper from "../components/Wrapper";
import { Link } from "react-router-dom";
import style from "../styles/uxstudio.module.css";
import FadeIn from "../components/FadeIn";
import React from "react";
// Images for Project 1 (Starship)
import proj1Mindmap from "../assets/uxstudio/proj1-mindmap.png";
import proj1Affinity from "../assets/uxstudio/proj1-affinity.png";
import proj2Mindmap from "../assets/uxstudio/proj2-mindmap.png";
import proj2Affinity from "../assets/uxstudio/proj2-affinity.png";
import proj2Prototyping from "../assets/uxstudio/proj2 - prototyping .png";
import proj3InterviewStages from "../assets/uxstudio/proj3-interviewstages.png";
import proj3Prototype from "../assets/uxstudio/proj3-prototype.png";
import proj3Redesign from "../assets/uxstudio/proj3-redesign.png";

const UXstudio = () => {
    return (
        <>
        <FadeIn duration={1000} delay={100}>
        <Wrapper>
            <h1>UX Studio Projects</h1>
            <p>This section contains projects completed for the UX Studio course at Purdue University.</p>
        </Wrapper>
        </FadeIn>
        <Wrapper>
            <h2>Project 1 - Starship Analysis + Redesign</h2>
            <p>
                Proposed repurpose of Starship robots as campus guidance aids for students with visual impairments. The project
                investigated delivery robot issues, gathered user perspectives, ideated non-food uses, iterated designs, and evaluated with users.
            </p>
            <h3>Brief</h3>
            <ul className={style.bullets}>
                <li>Investigate automated delivery services via background research, narrative and observational methods.</li>
                <li>Interview at least four participants and audio record sessions.</li>
                <li>Ideate non-food Starship applications from user desires and system insights.</li>
                <li>Sketch + storyboard solutions to reshape mental models of Starships.</li>
                <li>Evaluate with at least three users and iterate on findings.</li>
            </ul>

            <h3>Proposed Use</h3>
            <ul className={style.bullets}>
                <li>Guidance robots for visually impaired students across Purdue’s campus.</li>
                <li>Persistent chirp/audio cues to follow; 360° cameras; expanded operation zones.</li>
                <li>Emergency alert capabilities; distinct visual mandate to differentiate roles (guides vs delivery).</li>
            </ul>

            <h3>Research & Background</h3>
            <p><strong>Big Question:</strong> How can Starships be used effectively within Purdue’s parking facilities/enforcement?</p>
            <ul className={style.bullets}>
                <li>Observe sound patterns (chirps), approach behavior, and congestion handling.</li>
                <li>Evaluate visibility and recognizability (flags, colors, branding) and their consistency.</li>
                <li>Consider safety at intersections and crowd navigation.</li>
            </ul>
            <p className={style.imageNote}><em>Mind map:</em> from interviews and observations.</p>
            <img src={proj1Mindmap} alt="Project 1 mind map" className={style.imageWide} />

            <h3>Observational Methods</h3>
            <ul className={style.bullets}>
                <li>Locations: WALC walkway, Engineering Fountain area, busy crosswalks.</li>
                <li>Times: Vary by traffic density to compare navigation behaviors.</li>
                <li>Metrics: Task completion time, pause frequency, pile-up occurrences.</li>
            </ul>
            <p className={style.imageNote}><em>Affinity:</em> grouped interview themes.</p>
            <img src={proj1Affinity} alt="Project 1 affinity mapping" className={style.imageWide} />

            <h3>Interviews</h3>
            <ul className={style.bullets}>
                <li>Community views on repurposing retired Starships for accessibility aids.</li>
                <li>Experiences walking campus as new students; imagined impact if visually impaired.</li>
                <li>Parking impacts and how Starships could provide deeper utility beyond delivery.</li>
            </ul>
            

            <h3>Key Observations</h3>
            <ul className={style.bullets}>
                <li>Inconsistent chirps at intersections; occasional speech when assisted; variable person-sensing.</li>
                <li>Robots may pile up at crossings and stall with heavy crowds.</li>
                <li>Missing components (e.g., flags) reduce recognizability; inconsistent coloring/branding.</li>
            </ul>

            <h3>Interview Insights</h3>
            <ul className={style.bullets}>
                <li><strong>Before prompt:</strong> Generally positive sentiment; convenience acknowledged; concerns about safety and delays.</li>
                <li><strong>After prompt:</strong> Accessibility aid concept viewed positively but situational; alerts and audio cues recommended.</li>
                <li><strong>Themes:</strong> Convenience &gt; nuisance; traffic safety anxiety; strong support for repurposing; conditional trust for accessibility roles.</li>
            </ul>

            <h3>Design Process</h3>
            <ul className={style.bullets}>
                <li>Sketches toward guidance-role Starships (distinct colors, flags, audio cues).</li>
                <li>Wireframes for companion app (routing, alerts, emergency contact).</li>
                <li>Storyboards depicting guided campus travel and intersection behaviors.</li>
            </ul>
            <p className={style.imageNote}><em>Design visuals:</em> see slides for sketches, wireframes, storyboard.</p>

            <h3>Evaluation & Results</h3>
            <ul className={style.bullets}>
                <li>Three+ participant evaluations focusing on guidance clarity, safety perception, and recognizability.</li>
                <li>Positive reception to distinct audio cues and visual differentiation; safety concerns remain at roads.</li>
                <li>Conclusion: Starships can aid accessibility but campus infrastructure changes are also needed.</li>
            </ul>

            <h3>Future Steps</h3>
            <ul className={style.bullets}>
                <li>Field tests with visually impaired users; iterative tuning of audio cues and routing.</li>
                <li>Improve traffic/foot-traffic sensing; emergency escalation behaviors.</li>
                <li>Collaborate with campus for accessibility infrastructure improvements.</li>
            </ul>

            <h3>Contributions</h3>
            <ul className={style.bullets}>
                <li><strong>Sami:</strong> Diagrams, design process, sketching, storyboarding.</li>
                <li><strong>Anika:</strong> Interview research, slide/outline alignment, presentation visuals.</li>
                <li><strong>Tate:</strong> Concept ideation, research, observations, brief.</li>
                <li><strong>Ben:</strong> Design process, diagrams, research, wireframes, direction shifts.</li>
            </ul>
        </Wrapper>
        <Wrapper>
            <h2>Projects 2 & 3 — Martie (Smart Grocery Shopping)</h2>
            <p>
                Summary of two linked UX Studio projects exploring and designing "Martie",
                a smart shopping assistant focused on saving money, reducing food waste,
                and simplifying grocery decisions.
            </p>
            <h3>Overview</h3>
            <ul className={style.bullets}>
                <li><strong>Goal:</strong> Help budget-conscious shoppers plan and optimize grocery purchases.</li>
                <li><strong>Focus:</strong> Deals, expiring items, recipe planning, and waste reduction.</li>
                <li><strong>Outcome:</strong> Validated concepts via research → low/high-fidelity prototypes → usability testing.</li>
            </ul>

            <h3>Problem & Opportunity</h3>
            <ul className={style.bullets}>
                <li><strong>Pain points:</strong> Scattered deals, hard-to-compare prices, last-minute meal choices, forgotten items.</li>
                <li><strong>Opportunity:</strong> Centralize store data, surface savings, auto-plan meals, and track pantry to cut waste.</li>
            </ul>

            <h3>User Research</h3>
            <ul className={style.bullets}>
                <li><strong>Methods:</strong> Screener survey → interviews → contextual inquiry of shopping flows.</li>
                <li><strong>Participants:</strong> Students and young professionals managing tight budgets and time.</li>
                <li><strong>Key insights:</strong> Shoppers value clear unit pricing, trustworthy deal surfacing, and fast list building.</li>
            </ul>
            <p className={style.imageNote}><em>Project 2:</em> Mind map and affinity of early research.</p>
            <img src={proj2Mindmap} alt="Project 2 mind map" className={style.imageWide} />
            <img src={proj2Affinity} alt="Project 2 affinity mapping" className={style.imageWide} />

            <h3>Personas & Scenarios</h3>
            <ul className={style.bullets}>
                <li><strong>Persona A (Budget Planner):</strong> Plans weekly meals; wants lowest spend and minimal waste.</li>
                <li><strong>Persona B (Time-Pressed Cook):</strong> Needs quick decisions; prefers recipe-led auto lists.</li>
            </ul>
            <p className={style.imageNote}><em>Prototyping (lo-fi):</em> early screens and task flows.</p>
            <img src={proj2Prototyping} alt="Project 2 prototyping screens" className={style.imageWide} />

            <h3>Design Direction</h3>
            <ul className={style.bullets}>
                <li><strong>Core features:</strong> Smart grocery list, deal aggregation, recipe planner with unit price comparisons.</li>
                <li><strong>Pantry tracking:</strong> Alerts for expiring items and suggested recipes to use them.</li>
                <li><strong>Store-aware:</strong> Surface nearby store prices; support substitutions for savings.</li>
            </ul>
            

            <h3>Low-Fidelity Prototype (Project 2)</h3>
            <ul className={style.bullets}>
                <li><strong>Screens:</strong> Onboarding, home dashboard, add items, deals view, recipe planner, list review.</li>
                <li><strong>Navigation:</strong> Bottom nav: Home, Deals, Recipes, List, Pantry.</li>
                <li><strong>Testing:</strong> 5 participants; tasks: build list under budget, find best deals, plan a quick meal.</li>
            </ul>
            

            <h3>High-Fidelity Prototype (Project 3)</h3>
            <ul className={style.bullets}>
                <li><strong>Visual system:</strong> Clean, contrast-forward UI; clear unit pricing chips; savings highlights.</li>
                <li><strong>Microinteractions:</strong> Add-to-list confirm, substitution suggestions, recipe-to-list conversion.</li>
                <li><strong>Accessibility:</strong> WCAG-friendly colors, large tap targets, semantic structure.</li>
            </ul>
            <p className={style.imageNote}><em>Project 3 visuals:</em> interview stages, prototype, redesign.</p>
            <div className={style.imageGrid}>
                <img src={proj3InterviewStages} alt="Project 3 interview stages" className={style.imageCard} />
                <img src={proj3Prototype} alt="Project 3 prototype" className={style.imageCard} />
                <img src={proj3Redesign} alt="Project 3 redesign" className={style.imageCard} />
            </div>

            <h3>Usability Findings</h3>
            <ul className={style.bullets}>
                <li><strong>Successes:</strong> Unit price comparison understood; recipe-to-list flow praised for speed.</li>
                <li><strong>Issues:</strong> Deal filtering needed clearer defaults; pantry alerts timing felt aggressive.</li>
                <li><strong>Fixes:</strong> Added filter presets, softened alert cadence, clarified substitution language.</li>
            </ul>
            

            <h3>Impact & Next Steps</h3>
            <ul className={style.bullets}>
                <li><strong>Impact:</strong> Faster planning, lower spend, reduced food waste for target users.</li>
                <li><strong>Next:</strong> Real store data integration, pantry barcode scan, cross-store price engine.</li>
                <li><strong>Validation:</strong> A/B test filter defaults; pilot with weekly shoppers.</li>
            </ul>
            
        </Wrapper>
        </>
    )
}
export default UXstudio;