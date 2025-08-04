# Inkproof

A decentralized publishing and verification protocol for research and journalism that empowers independent authors, researchers, and journalists to publish freely, be validated transparently, and get rewarded directly — all on-chain.

---

## Overview

Inkproof consists of ten smart contracts that together form a censorship-resistant, trust-focused, and incentivized ecosystem for the free flow of credible information:

1. **Author Registry Contract** – Manages verified author identities and reputation.
2. **Content NFT Contract** – Mints immutable research/news articles as NFTs.
3. **Review & Rating Contract** – Enables peer and community reviews of content.
4. **Dispute Resolution Contract** – Handles challenges to content with staking-based arbitration.
5. **Curation Registry Contract** – Allows token-curated listings of high-quality content.
6. **Incentive Engine Contract** – Distributes rewards to authors, reviewers, and curators.
7. **Funding Bounties Contract** – Enables decentralized grant/bounty creation and fulfillment.
8. **Access Control Contract** – Supports paywalls, unlockables, and token-gated access.
9. **Publisher Governance Contract** – Allows the community to vote on major decisions.
10. **Reputation Oracle Contract** – Integrates external identity/reputation signals on-chain.

---

## Features

- **Verified authorship** using Clarity smart contracts  
- **Immutable publishing** of research, essays, and reports  
- **Peer review & rating** to filter and validate information  
- **On-chain dispute resolution** for misinformation challenges  
- **Token-curated registries** to surface top content  
- **Incentive alignment** for creators, validators, and readers  
- **Decentralized bounties** to fund critical writing and investigations  
- **Reputation-driven access and rewards**  
- **Optional paywalls and monetization models**  
- **Governance by contributors and readers alike**  

---

## Smart Contracts

### Author Registry Contract
- Add/remove verified authors
- Track author reputation scores
- Optional support for pseudonymity via zero-knowledge proofs

### Content NFT Contract
- Mint articles as NFTs (title, abstract, IPFS hash, timestamp)
- License metadata and access control
- Immutable proof of authorship and origin

### Review & Rating Contract
- Assign ratings and reviews to Content NFTs
- Track reviewer history and reward participation
- Filter content by community consensus

### Dispute Resolution Contract
- Allow staking to challenge misinformation
- Use voting or third-party arbitration
- Slash bad actors; reward accurate challengers

### Curation Registry Contract
- Token-curated content registries by topic or discipline
- Stake to promote/demote content
- Reputation boosts based on curation quality

### Incentive Engine Contract
- Reward content creation, review, and curation
- Configure token distribution schedules
- Anti-sybil and anti-gaming mechanisms

### Funding Bounties Contract
- Create research or journalism bounties
- Lock funding and link to deliverables
- DAO/community approval for payout

### Access Control Contract
- Support NFT-gated, token-gated, or time-locked access
- Create private or public unlockable content
- Enable tipping and micro-payment models

### Publisher Governance Contract
- Community voting on rule changes, reputation policies
- Proposal and voting logic
- Quorum, delay, and execution rules

### Reputation Oracle Contract
- Off-chain reputation bridge (e.g. ORCID, CrossRef, news verification)
- Feed author history or institution-backed metadata on-chain
- Score weighting for external validation

---

## Installation

1. Install [Clarinet CLI](https://docs.hiro.so/clarinet/getting-started)
2. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/inkproof.git
   ```
3. Run tests:
    ```bash
    npm test
    ```
4. Deploy contracts:
    ```bash
    clarinet deploy
    ```

---

## Usage

Each smart contract can run independently but is designed to interoperate as a full decentralized publishing and curation protocol.
Refer to individual contract folders and documentation for detailed usage, entrypoints, and integration flows.

---

## License

MIT License