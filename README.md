#### 🌟 Please Star my repo if you like it

<div align="center">
    <img src="https://github.com/kanugurajesh/Siem-Converter/assets/120458029/1f90c572-7e01-4ee1-8989-ff22288da432" alt="" width=150 height=150>
</div>

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
## Tech Stack

- React.js
- Fastapi
- Shadcdn
- Pysigma

## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://rajeshportfolio.me/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/rajesh-kanugu-aba8a3254/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/exploringengin1)

## Authors

- [@kanugurajesh](https://github.com/kanugurajesh)
