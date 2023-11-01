import React from 'react';

export const aspects = [
  {
    title: 'Actor',
    color: 'primary',
    numButton: 1,
    description:
      'Who is allegedly responsible for a malicious action, or agenda?',
  },
  {
    title: 'Action',
    color: 'success',
    numButton: 2,
    description: 'What is the actor doing to cause negative outcomes?',
  },
  {
    title: 'Pattern',
    color: 'neutral',
    numButton: 3,
    description:
      'Which non-intuitive/surprising aspects support the existence of the conspiracy?',
  },
  {
    title: 'Threat',
    color: 'danger',
    numButton: 4,
    description:
      'What are the negative outcomes, affecting individuals or groups of people?',
  },
  {
    title: 'Secrecy',
    color: 'warning',
    numButton: 5,
    description: 'Why does the mainstream not recognize the conspiracy yet?',
  },
];

export const exampleAspects = {
  Actor: {
    description: (
      <span>
        The comment refers to the BBC and CIA as well as to the{' '}
        <em>Alphabet agency</em>
        (i.e.: FBI, NSA, DHS etc.) that operate with malicious intent (
        <em>create a link and continue with the narrative</em>) that poses a
        threat (<em>Russian controlled nazi</em>).
      </span>
    ),
    text: `SS: Just a reminder that various extremist groups that are out there, trying to recruit people, are actually CIA and other Alphabet agency Honeypots. In this case, the BBC s even admitting this guy is CIA but says he's only "former" CIA (yea right) and also they are making sure to create a link to Russia so they can continue with the narrative that anyone who isn't on the left is a Russian controlled Nazi, lol.`,
    detailsList: [
      'Actors can also be personified, (in)animate beings, but also abstract entities. For example, both “communists” and “communism” can also be an actor.',
      'ambiguous references, like pronouns (“who know who they are”), can also be annotated as an actor',
      'Actors need to be the ones perceived by the writer of the comment to be the referents of actions',
      'An actor answers the question: “who are the main actors being alleged with wrongdoing?”',
      [
        <span>In case of multiple actors:</span>,
        [
          <span>
            Mark all involved actors who are responsible for the outlined
            wrongful action. In some cases, they are implicitly implicated or
            the text specifies how they collaborate{' '}
          </span>,
          <span>
            E.g.: “[...] it reaffirms the links between <strong>Clinton</strong>
            , <strong>Spacey</strong> and <strong>Blair</strong> and{' '}
            <strong>Mandelson</strong> - all friends with Epstein and all in his
            little black book.”
          </span>,
          <span>
            E.g.: “POTUS had her followed and there are indications that Parnas
            and Giuliani were trying to murder her in Ukraine, which is now
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
      'Who are the main characters allegedly responsible for wrongdoings?',
      'Who creates negative consequences?',
      'Who is doing something to someone?',
      'Who has malevolent plans?',
      'Who are the conspirators?',
      'Who is thought of as having negative intentions?',
      'Who is framed as the outgroup/others pursuing an agenda?',
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
      <span>
        An <strong>action</strong> can also represent plans, intentions,
        motivations, or goals
      </span>,
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
      'How do the malevolent actors  influence the world?',
      'What is done to influence the world?',
      'What is done to execute the conspiracy?',
      'Through which actions does the conspiracy influence the world?',
      'Can you mark a text passage representing how the actor poses a threat showing how (malicious) actions are perpetrated?',
      'Can you mark a text passage representing how the actor poses a threat showing how the actor behaves leading to negative consequences/outcomes?',
      'How the actor behaves resulting in a (potential) negative outcome?',
      'What is the actor doing to cause negative outcomes?',
      'Through which actions does the conspiracy influence the world?',
    ],
    collapseAnimationDuration: 350,
  },
  Threat: {
    description: (
      <span>
        The comment refers to the actors as represented by{' '}
        <em>Epstein’s clients</em> who pose a threat by the{' '}
        <em>massive sex trafficking operation</em>. A further threat is the{' '}
        <em>hacked secret email server</em>.
      </span>
    ),
    text: "SS: I bet $100 there's some juicy stuff in there that some people don't want to ever see the light of day. According to the Daily Telegraph, Maxwell maintained a secret email server and failed to secure it. Maxwell claims that her email server was hacked after a court unsealed approximately 2,000 pages of documents last August, according to the Daily Mail. The extent of the breach is unknown. If emails were obtained in the hack they could showcase embarrassing information on Epstein's clients, alleged victims, and co-conspirators in his massive sex trafficking operation.",
    detailsList: [
      [
        <span>
          Sometimes it is difficult to differentiate between Action and{' '}
          <em>Threat</em>. Consider the following:
        </span>,
        <span>
          <strong>Threat</strong> refers to negative consequences, not to the
          targets that will suffer the consequences.
        </span>,
        [
          <span>
            The <strong>threat</strong> is the negative consequence of the
            action. Action is the plan or proposition. E.g.:
          </span>,
          <span>
            “BlackRock Inc. and State Street Global Advisors are{' '}
            <strong>voting against (action)</strong> directors at companies
            without a female director. Public companies with all-male boards
            based in California now face a{' '}
            <strong>$100,000 fine (threat)</strong> under new state law.”
          </span>,
        ],
        [
          <span>
            If an <strong>action</strong> has inherently negative consequences,{' '}
            <strong>action</strong> and <strong>threat</strong>
            coincide. E.g.:
          </span>,
          <span>
            “The extent of the breach is unknown. If emails were obtained in the
            hack they could showcase embarrassing information on Epstein’s
            clients, alleged victims, and co-conspirators in his massive{' '}
            <strong>sex trafficking (both action and threat)</strong> operation.
          </span>,
        ],
      ],
    ],
    highlights: [
      { id: 1, start: 42, end: 45, aspect: aspects[3] },
      { id: 2, start: 90, end: 93, aspect: aspects[3] },
    ],
    controlQuestionsList: [
      'If anyone is negatively affected, how are these consequences described?',
      'What are the negative outcomes of the conspiracy?',
    ],
    collapseAnimationDuration: 450,
  },
  Pattern: {
    description: (
      <span>
        In the following text example, the patterns consist of the word{' '}
        <em>“former”</em> alongside <em>yea right</em>, which shows that the
        author of the comment believes the CIA to be behind the scheme.
        Furthermore, <em>making sure to create a link</em> implicates the BBC in
        covering up the allegedly true story. Lastly, <em>nice try feds</em>{' '}
        reinforce the attribution of the hidden scheme to the federal agencies.
      </span>
    ),
    text: 'SS: Just a reminder that various extremist groups that are out there, trying to recruit people, are actually CIA and other Alphabet agency Honeypots. In this case, the BBC is even admitting this guy is CIA but says he\'s only "former" CIA (yea right) and also they are making sure to create a link to Russia so they can continue with the narrative that anyone who isn\'t on the left is a Russian controlled Nazi, lol. Nice try Feds!',
    detailsList: [
      'Patterns express that: "there must be something more than meets the eye/someone must be behind it/this confirms previous interpretations"',
      'Patterns are against mainstream beliefs (according to the speaker), should not be obvious, and support the speaker’s interpretation.',
      [
        'Further pattern examples:',
        'coincidences and unlikely events that the speaker believes are artifacts of someone’s action (someone must have done it/nothing is a coincidence)',
        [
          'non-obvious connections between events and people (everything is connected/connect the dots), e.g.:',
          <span>
            “I thought this was worth sharing as it again{' '}
            <strong>reaffirms the links</strong> between Clinton, Spacey and
            Blair and Mandelson - all friends with Epstein and all in his little
            black book”
          </span>,
        ],
        [
          'perceived motivations of the actor that make their actions likely, e.g.:',
          <span>
            “<strong>there is money to be made</strong>”, ”emails{' '}
            <strong>could showcase embarrassing information</strong> on…”
          </span>,
        ],
        [
          'expressions of skepticism and rebuttal of established knowledge, e.g.:',
          <span>
            “<strong>I bet there is some juicy stuff</strong> in there”
          </span>,
        ],
        [
          'recurring events that take on a symbolic meaning, by the virtue of being repeated or connecting with established theories. E.g.:',
          <span>
            “I suppose there are{' '}
            <strong>cases of things like this all over the country</strong>.
            Students at a small university coming from wuhan and mixing in with
            other students who may go home to all sorts of other parts of the
            country.”
          </span>,
        ],
      ],
    ],
    highlights: [
      { id: 1, start: 40, end: 40, aspect: aspects[2] },
      { id: 2, start: 42, end: 43, aspect: aspects[2] },
      { id: 3, start: 48, end: 53, aspect: aspects[2] },
      { id: 4, start: 76, end: 78, aspect: aspects[2] },
    ],
    controlQuestionsList: [
      'Is the author of the text expressing that there is something more going on or that the presented facts/observations cannot be coincidences?',
      'Why does the text author thinks it is worth sharing?',
      'Is there evidence provided for the observations?',
      'Which aspects would the text author think is surprising to the reader?',
      'How does the author of the text establish links, present evidence, and highlight inconsistencies that support the existence of the conspiracy?',
      'Why is the conspiracy theory true, according to the author of the text?',
      'How does the author of the text connect observations as evidence for a conspiracy?',
      'Which aspects would the author of the text think are surprising to the reader?',
      'According to the author, which aspects should be surprising to the audience?',
      'How does the author justify the existence of the conspiracy?',
      'Which aspects of the theory are there to convince the reader?',
      'Which non-intuitive aspects are used to claim the existence of the conspiracy',
    ],
    collapseAnimationDuration: 600,
  },
  Secrecy: {
    description: (
      <span>
        The comment refers to the following secrecy:{' '}
        <em>the mysteries behind “Quantum Locking”</em> and{' '}
        <em>don’t be fooled</em> function as secrecy by signalling hidden
        processes and an intentional cover-up.
      </span>
    ),
    text: 'SS: This video here is One of the better video explanations dealing with the mysteries behind "Quantum Locking", but don\'t be fooled what is going on here has more to do with the Magnets then anything Quantum. Another reason why its one of the better videos is more demonstrations in the video and this dude in the video did am Ok job in their Explanation',
    detailsList: [
      'Secrecy is conveyed through actions of the actor, which are covert or aim at covering up',
      "Secrecy expresses the speaker's attitude that what is revealed would not be surprising for others but rather a fact (e.g. “don’t be fooled”).",
      'In contrast, pattern is surprising to the speaker.',
      [
        'Secrecy can also be conveyed if the actions of the actor are not hidden, but they are widely misinterpreted or rejected by the public. E.g.:',
        <span>
          “Again - <strong>why is no one asking</strong> how any of these people
          knew Epstein?“
        </span>,
      ],
      [
        'Secrecy can also occur when previously unknown evidence has made it to the public, e.g.:',
        <span>
          “Photo of Spacey and Clinton is below it - definitely save it as I
          think this is the <strong>first time it has been shown</strong>”
        </span>,
      ],
    ],
    highlights: [
      { id: 1, start: 13, end: 17, aspect: aspects[4] },
      { id: 2, start: 19, end: 21, aspect: aspects[4] },
    ],
    controlQuestionsList: [
      'What are the aspects of the text the author is suspicious of?',
      'What are the reasons that the mainstream does not recognize a threat and malicious actions yet?',
      'Why is the conspiracy theory not accepted by the mainstream?',
      'How is the conspiracy hidden from common knowledge',
      'How does the actor(s) attempt(s) to conceal their actions, but are identified by the author of the text?',
      "What are the actors' actions to divert the public attention, identified by the author?",
      'What is diverted from public attention, that is instead identified by the author of the text?',
      'How is the conspiracy hidden from common knowledge',
      'What shows that there is knowledge hidden from the public',
    ],
    collapseAnimationDuration: 450,
  },
};

export const aspectDescriptions = [
  {
    title: 'Actor',
    description: (
      <span>
        An actor can be a single individual, a powerful group, institution, or
        collective (e.g., governmental agencies, international organizations).
        Mark a text passage as an <strong>Actor</strong> if an agent is
        explicitly named or indirectly mentioned (e.g., they) and is framed as
        responsible for a threat or actions with malicious intent. If the same
        actor is represented multiple times (e.g. referenced through “he”,
        “they”), only mark the actor once and the first instance.
      </span>
    ),
  },
  {
    title: 'Action',
    description: (
      <span>
        Mark a text passage as <strong>Action</strong> if powerful actors or
        powerful individuals purposefully and intentionally pursue malicious
        motives and schemes, which contribute to an agenda or reward.
      </span>
    ),
  },
  {
    title: 'Threat',
    description: (
      <span>
        Mark a text passage as a <strong>Threat</strong> if the passage is a
        (possible) negative consequence of an actors’ action. A threat can be
        one or multiple events that have already occurred, but also possible
        outcomes in the future. A threat can entail a criminal event,
        undermining individual actions, or causing systemic harm.
      </span>
    ),
  },
  {
    title: 'Pattern',
    description: (
      <span>
        A pattern is about the observations the individual makes, who wrote or
        posted the comment. Mark a text passage as a <strong>Pattern</strong> if
        the author of the comment connects events or specific observations to an
        integrated whole by attributing cause and effect, questions, events, or
        coincidences. Pattern may provide alleged evidence.
      </span>
    ),
  },
  {
    title: 'Secrecy',
    description: (
      <span>
        Secrecy occurs when an actor makes covert actions or tries to cover them
        up and divert public attention. Mark a text passage as{' '}
        <strong>Secrecy</strong> if the text conveys missing information or
        shows the intentions of the actor to mislead the public. Secrecy can
        also be implied by being overt (e.g., laying in plain sight) and obvious
        attempts to mislead. Secrecy supports the speaker's explanation of why
        something is a conspiracy and not a mainstream theory.
      </span>
    ),
  },
];
