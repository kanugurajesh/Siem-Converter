# SigTrans

A reactJS web app that can take a ruleset and translate it into any SIEM search query, using Sigma

## Prequisites

### Local Setup

```bash
1. git
2. npm
3. python
```

### Docker Setup

```bash
1. Docker
```

## Folder Structure

```bash
.
├── README.md
├── backend
│   ├── Dockerfile
│   ├── README.md
│   ├── __pycache__
│   ├── env
│   ├── main.py
│   └── requirements.txt
├── docker-compose.yml
├── folder_structure.txt
└── frontend
    ├── Dockerfile
    ├── README.md
    ├── components.json
    ├── index.html
    ├── node_modules
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.js
    ├── public
    ├── src
    ├── tailwind.config.js
    ├── tsconfig.json
    ├── tsconfig.node.json
    └── vite.config.ts
```

## Installation

### Local Setup

```bash
1. clone the repository
2. cd into the repository
3. cd into there frontend folder and follow the Installation instructions there
4. cd into the backend folder and follow the Installation instructions there
5. Go to http://localhost:5173 and start using the application
```

### Docker Setup

```bash
1. docker-compose up
2. wait for the Installation to complete
3. Go to http://localhost:5173 and start using the application
```

## Project Demo

<p>Click on the below image to view the video</p>

<br/>

[![Watch the video](https://ik.imagekit.io/hbzknb1hm/Screenshot%202023-11-20%20121156.png?updatedAt=1700462537547)](https://youtu.be/H2q_HDg6r5Q?feature=shared)

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/wuVsDoSU)

## Sample Input

I have provided a sample rule.yml file in the root directory of the project. You can use that to test the application. or you can use the following ruleset.

```bash
    title: Suspicious SYSTEM User Process Creation
    id: 2617e7ed-adb7-40ba-b0f3-8f9945fe6c09
    status: test
    description: Detects a suspicious process creation as SYSTEM user (suspicious program or command line parameter)
    references:
        - Internal Research
        - https://tools.thehacker.recipes/mimikatz/modules
    author: Florian Roth (rule), David ANDRE (additional keywords)
    date: 2021/12/20
    modified: 2022/04/27
    logsource:
        category: process_creation
        product: windows
    detection:
        selection:
            IntegrityLevel: System
            User|contains: # covers many language settings
                - 'AUTHORI'
                - 'AUTORI'
        selection_special:
            - Image|endswith:
                - '\calc.exe'
                - '\wscript.exe'
                - '\cscript.exe'
                - '\hh.exe'
                - '\mshta.exe'
                - '\forfiles.exe'
                - '\ping.exe'
            - CommandLine|contains:
                # - 'sc stop ' # stops a system service # causes FPs
                - ' -NoP '  # Often used in malicious PowerShell commands
                - ' -W Hidden '  # Often used in malicious PowerShell commands
                - ' -decode '  # Used with certutil
                - ' /decode '  # Used with certutil
                - ' /urlcache '  # Used with certutil
                - ' -urlcache '  # Used with certutil
                - ' -e* JAB'  # PowerShell encoded commands
                - ' -e* SUVYI'  # PowerShell encoded commands
                - ' -e* SQBFAFgA'  # PowerShell encoded commands
                - ' -e* aWV4I'  # PowerShell encoded commands
                - ' -e* IAB'  # PowerShell ncoded commands
                - ' -e* PAA'  # PowerShell encoded commands
                - ' -e* aQBlAHgA'  # PowerShell encoded commands
                - 'vssadmin delete shadows'  # Ransomware
                - 'reg SAVE HKLM'  # save registry SAM - syskey extraction
                - ' -ma '  # ProcDump
                - 'Microsoft\Windows\CurrentVersion\Run'  # Run key in command line - often in combination with REG ADD
                - '.downloadstring('  # PowerShell download command
                - '.downloadfile('  # PowerShell download command
                - ' /ticket:'  # Rubeus
                - 'dpapi::'     #Mimikatz
                - 'event::clear'        #Mimikatz
                - 'event::drop'     #Mimikatz
                - 'id::modify'      #Mimikatz
                - 'kerberos::'       #Mimikatz
                - 'lsadump::'      #Mimikatz
                - 'misc::'     #Mimikatz
                - 'privilege::'       #Mimikatz
                - 'rpc::'      #Mimikatz
                - 'sekurlsa::'       #Mimikatz
                - 'sid::'        #Mimikatz
                - 'token::'      #Mimikatz
                - 'vault::cred'     #Mimikatz
                - 'vault::list'     #Mimikatz
                - ' p::d '  # Mimikatz
                - ';iex('  # PowerShell IEX
                - 'MiniDump'  # Process dumping method apart from procdump
                - 'net user '
        condition: all of selection*
    falsepositives:
        - Administrative activity
        - Scripts and administrative tools used in the monitored environment
        - Monitoring activity
    level: high
```

## Shuffle

![Company Logo](https://www.shuffler.io/images/logos/orange_logo.svg)

### Company information 

Shuffle is an open source cybersecurity SOAR platform based out of Oslo, Norway.

### Why participate in an Octernship with Shuffle?

Shuffle is an open-source SOAR platform in the cybersecurity field with a burgeoning community, with a primary goal to make it easier to automate your operations. As a Cybersecurity Engineer, you will have the chance to contribute to the platform's improvement, further develop your skills, and be considered for a full-time role at the company.

### Octernship role description

We are seeking a skilled and dedicated Cybersecurity Engineer to join our team and ensure the reliability, performance and robust integrations of our cybersecurity web app platform. In this role, you will play a crucial part in managing and working with APIs, building scripts, testing code and deployment, and verifying the effectiveness of infrastructure.

### Key Responsibilities:

- Work on updating, building and integrating new APIs on the platform.
- Build scripts to connect and automate several parts of the platform and internal team features.
- Actively contribute to the codebase and improve the platform.
- Work on automation tasks for the in-platform features and team operations.
- Perform functional, regression, and integration testing to ensure the platform's reliability and consistency.
- Collaborate with cross-functional teams to ensure codebase requirements are integrated into the development lifecycle.
- Eventually work on workflow engineering and detection engineering.
- Stay up-to-date with industry best practices, testing methodologies, and emerging technologies to improve the QA process.

### Qualifications

- Proficiency in programming and scripting languages such as Python, PowerShell, or Bash.
- Strong understanding of cybersecurity concepts, protocols, and technologies.
- Experience with security testing of RESTful APIs and microservices.
- Experience with container security (e.g., Docker, Kubernetes).
- Excellent problem-solving skills and the ability to work independently and collaboratively.
- Proficiency in security testing tools and methodologies.
- Understanding of secure coding practices and code review processes.
- Strong communication and teamwork skills.
- Ability to prioritize and manage multiple testing tasks and projects.
- Understanding of DevSecOps principles and practices.

(Preferred Qualifications)

- Proven experience in cybersecurity engineering, with a focus on integration, APIs, scripting, and code development.
- Experience with security tools and platforms is advantageous.
- Knowledge of detection engineering and workflow development is a plus but not required.
- Familiarity with cloud security principles and best practices.
- Incident response experience and familiarity with security incident management.

### Eligibility

To participate, you must be:

* A [verified student](https://education.github.com/discount_requests/pack_application) on Global Campus

* 18 years or older

* Active contributor on GitHub (monthly)

### Timeline

| Action  | Date |
| ------------- | ------------- |
| Assignment Published | 11/01/2023 |
| Assignment Deadline | 11/14/2023 |
| Octernship Start | 12/01/2023 |
| Octernship End | 02/28/2024 |

# Assignment

## Build a ruleset transaltor app.

### Task instructions 📝 and Expectations 👩‍💻👨‍💻

Build a reactJS web app that can take a ruleset and translate it into any SIEM search query, using [Sigma](https://github.com/SigmaHQ/sigma). For more context, look at [this issue](https://github.com/Shuffle/python-apps/issues/148).

### Task submission 🚀

1. Apply to this assignment via GitHub Octernships [Dashboard](https://education.github.com/students/octernships)
2. Submit the app files here. 

### Resources 📚

- Sigma - https://github.com/SigmaHQ/sigma
- Uncoder - https://uncoder.io
