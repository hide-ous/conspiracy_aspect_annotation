import React from 'react';

export const aspects = [
  {
    title: 'Actor',
    color: 'primary',
    numButton: 1,
    description:
      'Who is allegedly responsible for a malicious action or agenda?',
  },
  {
    title: 'Action',
    color: 'success',
    numButton: 2,
    description: 'What is the actor doing or planning to do to cause negative outcomes?',
  },
  {
    title: 'Effect',
    color: 'neutral',
    numButton: 3,
    description:
      'What are the negative consequences of the actor\'s agenda?',
  },
  {
    title: 'Victim',
    color: 'danger',
    numButton: 4,
    description:
      'Who is negatively affected by the actor\'s agenda?',
  },
  {
    title: 'Evidence',
    color: 'warning',
    numButton: 5,
    description: 'Which arguments or expressions does the writer of the text use to support his claims?',
  },
];

export const exampleAspects = {
  Actor: {
    description: (
      <span>
        The comment refers to the <em>BBC</em> and <em>CIA</em> as well as to the{' '}
        <em>Alphabet agency</em>
        (i.e.: FBI, NSA, DHS etc.) that operate with malicious intent (
        <em>create a link and continue with the narrative</em>) that poses a
        threat (<em>Russian controlled nazi</em>).
      </span>
    ),
    text: `SS: Just a reminder that various extremist groups that are out there, trying to recruit people, are actually CIA and other Alphabet agency Honeypots. In this case, the BBC is even admitting this guy is CIA but says he's only "former" CIA (yea right) and also they are making sure to create a link to Russia so they can continue with the narrative that anyone who isn't on the left is a Russian controlled Nazi, lol.`,
    detailsList: [
      'An actor passage answers the question: “who are the main actors being alleged with wrongdoing?”',
      [
        <span>Actors can also be personified, (in)animate beings, or abstract entities. E.g., both “communists” and “communism” can be actors.</span>,
        [<span>In case of multiple actors:</span>,
          <span>
            Mark all involved actors who are responsible for the outlined
            wrongful action. In some cases, they are implicitly implicated or
            the text specifies how they collaborate{' '}
          </span>,
          <span>
            E.g.: “[...] it reaffirms the links between <strong>Clinton</strong>
            , <strong>Spacey</strong> and <strong>Blair</strong> and{' '}
            <strong>Mandelson</strong> - all friends with <strong>Epstein</strong> and all in his
            little black book.”
          </span>,
          <span>
            E.g.: “<strong>POTUS</strong> had her followed and there are indications that <strong>Parnas</strong>{' '}
            and <strong>Giuliani</strong> were trying to murder her in Ukraine, which is now
            being criminally investigated.”{' '}
          </span>,
        ],
      ],
    ],
    highlights: [
      {
        id: 1,
        start: 18,
        end: 22,
        aspect: aspects[0],
      },
      {
        id: 2,
        start: 28,
        end: 28,
        aspect: aspects[0],
      },
    ],
    controlQuestionsList: [
      'Who has negative intentions or creates negative consequences?',
      'Who has an agenda or malevolent plans?',
      'Who are the conspirators?',
      'Who is doing something to someone else?',
    ],
    collapseAnimationDuration: 500,
  },
  Action: {
    description: (
      <span>
        The comment refers to <em>Hillary Clinton</em> who represents the
        powerful individual whose malicious and direct actions are represented
        by the verb <em>oversaw</em> in relation to a{' '}
        <em>multi-billion dollar fraud/theft</em>.
      </span>
    ),
    text: 'SS: New report alleges Hillary Clinton oversaw a multi-billion dollar fraud/theft, and high-ranking FBI agents are now coming forward with more details about it.',
    detailsList: [
      'An action passage answers the question: “Which actions do the actors undertake (or intend to undertake) to accomplish their goals?”',
          [
        <span>
          An <strong>action</strong> can be direct and indirect (e.g., exertions
          of influence and purposeful act omissions). E.g.:
        </span>,
        <span>
          <em>Direct</em>: “FEMA{' '}
          <strong>proposes Martial Law and gun confiscation</strong> to combat
          coronavirus.”
        </span>,
        <span>
          <em>Indirect</em>: “Goldman Sachs <strong>won’t work</strong> on a
          company’s IPO unless the board has at least one person who is not
          white, male, or straight”
        </span>,
      ],
    ],
    highlights: [
      {
        id: 1,
        start: 6,
        end: 6,
        aspect: aspects[1],
      },
    ],
    controlQuestionsList: [
      'How are the negative consequences created?',
      'What is the actor doing or trying to achieve?',
      'What is done to influence the world?',
      'How does the actor pose a threat or create (potential) negative outcomes? ',
    ],
    collapseAnimationDuration: 350,
  },
  Effect: {
    description: (
      <span>
      The comment refers to the actors, <em>Epstein’s clients</em>, whose activities have negative effects to victims by subjecting them to <em>sex trafficking</em>. In this case, <em>sex trafficking</em> is both the action (what the actors do) and the effect (the negative consequence for victims, since sex trafficking is an activity with negative consequences inherently).
      </span>
    ),
    text: "SS: I bet $100 there's some juicy stuff in there that some people don't want to ever see the light of day. According to the Daily Telegraph, Maxwell maintained a secret email server and failed to secure it. Maxwell claims that her email server was hacked after a court unsealed approximately 2,000 pages of documents last August, according to the Daily Mail. The extent of the breach is unknown. If emails were obtained in the hack they could showcase embarrassing information on Epstein's clients, alleged victims, and co-conspirators in his massive sex trafficking operation.",
    detailsList: [
      'An effect passage answers the question: “What are the negative consequences of the actor\'s agenda?”',
      [
        <span>
          Sometimes it is difficult to differentiate between Action and{' '}
          <em>Effect</em>. Consider the following:
        </span>,
        <span>
          <strong>Effect</strong> refers to negative consequences, not to the
          targets that will suffer the consequences.
        </span>,
        [
          <span>
            The <strong>effect</strong> is the negative consequence of the
            action. Action is the plan or proposition. E.g.:
          </span>,
          <span>
            “BlackRock Inc. and State Street Global Advisors are{' '}
            <strong>voting against (action)</strong> directors at companies
            without a female director. Public companies with all-male boards
            based in California now face a{' '}
            <strong>$100,000 fine (effect)</strong> under new state law.”
          </span>,
        ],
      ],
    ],
    highlights: [
      // { id: 1, start: 42, end: 45, aspect: aspects[3] },
      // { id: 2, start: 90, end: 93, aspect: aspects[3] },
      { id: 1, start: 91, end: 92, aspect: aspects[2] },
    ],
    controlQuestionsList: [
      'If anyone is negatively affected, how are these consequences described?',
      'What are the negative outcomes of the conspiracy?',
    ],
    collapseAnimationDuration: 450,
  },
  Victim: {
    description: (
      <span>
        In this comment, the author hints at <em>the highest levels of government, the ambassadors, and intelligence agencies</em> (actor) being part of a conspiracy. At the very least, the victims of this conspiracy are <em>individuals banned from the United States</em> who are suffering expatriation from the actors’ attempts to cover up the conspiracy.
      </span>
    ),
    text: 'SS: Rudy drops radical bombs on Fox and Friends implicating the highest levels of government, the ambassadors, and intelligence agencies. He makes names and has recorded testimony from individuals banned from the United States to keep it quiet. The hosts get nervous that such things are being revealed on their show live. ',
    detailsList: [
      'Victim passages answer the question: “Who suffers the negative effects of the conspiracy?”',
    ],
    highlights: [
      { id: 1, start: 28, end: 33, aspect: aspects[3] },
      // { id: 1, start: 40, end: 40, aspect: aspects[2] },
      // { id: 2, start: 42, end: 43, aspect: aspects[2] },
      // { id: 3, start: 48, end: 53, aspect: aspects[2] },
      // { id: 4, start: 76, end: 78, aspect: aspects[2] },
    ],
    controlQuestionsList: [
      'Who is negatively impacted?',
      'Who do actors target?',
    ],
    collapseAnimationDuration: 600,
  },
  Evidence: {
    description: (
      <span>The evidence lays primarily in BBC’s admission that the conspiracy exists (<em>the BBC is even admitting</em>). The author of the text supports this through their own hunch, putting <em>“former”</em> in quotes and remarking <em>yea right</em>, which shows that the author of the text believes that the CIA is behind the scheme. Furthermore, the author connects this story with previous ones (<em>so they can continue with the narrative</em>), showing that the existing pattern fits what they know of previous conspiracies.</span>
    ),
    text: 'SS: Just a reminder that various extremist groups that are out there, trying to recruit people, are actually CIA and other Alphabet agency Honeypots. In this case, the BBC is even admitting this guy is CIA but says he\'s only "former" CIA (yea right) and also they are making sure to create a link to Russia so they can continue with the narrative that anyone who isn\'t on the left is a Russian controlled Nazi, lol. Nice try Feds!',
    detailsList: [
      'Evidence passages answer the question: “How does the writer of the text argue that the conspiracy exists?”',
      ['Evidence examples:',
        'Coincidences and unlikely events that are thought to originate from someone\'s action (nothing is a coincidence);',
        'Non-obvious connections between events and people. E.g. “Doesn’t it seem suspicious that they all resigned at the same time?”;',
          'Alleged characteristics of the actors that make the conspiracy more likely',
        'Expressions of skepticism and rebuttal of established knowledge;',
        'Non-obvious connections between events and people (everything is connected/connect the dots) e.g. “Doesn\'t it seem suspicious that they all resigned at the same time?”;',
        'Recurring events that make the conspiracy more likely to exist. E.g., “there are cases of things like this all over the country”'
      ]
],
    highlights: [
      // { id: 1, start: 13, end: 17, aspect: aspects[4] },
      // { id: 2, start: 19, end: 21, aspect: aspects[4] },
      { id: 1, start: 27, end: 31, aspect: aspects[4] },
      { id: 2, start: 40, end: 40, aspect: aspects[4] },
      { id: 3, start: 42, end: 43, aspect: aspects[4] },
      { id: 4, start: 56, end: 62, aspect: aspects[4] },
    ],
    controlQuestionsList: [
      'How is the author of the text expressing that there is something more going on?',
      'Why does the text author think it is worth sharing this story?',
      'How does the author refute mainstream knowledge?',
      'How does the author of the text establish links, present evidence, and highlight inconsistencies that support the existence of the conspiracy?',
    ],
    collapseAnimationDuration: 450,
  },
};

export const aspectDescriptions = [
  {
    title: 'Actor',
    description: (
        <span>
        Actors are responsible for the malicious plans or negative consequences in the narrative.
            They may be individuals, a powerful group, or an institution.
            An actor may also collaborate or contribute to the execution of conspiratorial goals (e.g., facilitators who help the main characters).
          </span>
    ),
  },
  {
    title: 'Action',
    description: (
        <span>
        Actions are performed by actors to pursue their agenda.
            An action can also represent plans, intentions, motivations, or goals.
            Actions include manipulating information about the conspiracy (e.g., distorting or hiding information).
          </span>
    ),
  },
  {
    title: 'Effect',
    description: (
        <span>
        The effects of a conspiracy can be past events (e.g., criminal activities, harm caused) or possible future negative outcomes  or threats.
          </span>
    ),
  },
  {
    title: 'Victim',
    description: (
        <span>
        The victims may be the explicit target of the conspiracy or implied or may be unintentionally harmed in the actors’ agenda.
            The effect on victims may have already happened or may still happen.
          </span>
    ),
  },
  {
    title: 'Evidence',
    description: (
        <div>Evidence may be based on facts, assumptions, suspicions or on statements presented as evidence, such as:
          <ul>
            <li>
              Documented evidence: factual sources, leaked documents, public court trials
            </li>
            <li>
              Indirect inferences: recurring patterns, coincidences that are too suspicious, reference to similar events
            </li>
            <li>
              Unsubstantiated suspicions: personal hunches that suggest plausibility, speculations there is more than meets the eye that supports the overall argument
            </li>
          </ul>
          Evidence is often against mainstream beliefs and may not be obvious, but should still support the text author’s interpretation.
          Evidence may express: “there is more to this than meets the eye” or “someone must be behind it”
        </div>
      // <div>
      //   Evidence may be based on hard facts to varying degrees (annotate all of them):
      //   <ul>
      //     <li>Documented evidence: factual sources, leaked documents, public trials, first-hand testimony</li>
      //     <li>Indirect inferences: recurring patterns, coincidences that are too suspicious, reference to similar events</li>
      //     <li>Unsubstantiated suspicions: personal hunches that suggest plausibility, speculations there is more than meets the eye that supports the overall argument</li>
      //   </ul>
      // </div>
    ),
  },
];
