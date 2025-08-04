import { describe, it, expect, beforeEach } from "vitest"

type Principal = string

interface TokenMetadata {
  title: string
  ipfsHash: string
  createdAt: number
}

class MockContentNFT {
  private admin: Principal
  private tokenCounter: number
  private tokenOwner: Map<number, Principal>
  private tokenMeta: Map<number, TokenMetadata>
  private blockHeight: number

  constructor(admin: Principal) {
    this.admin = admin
    this.tokenCounter = 0
    this.tokenOwner = new Map()
    this.tokenMeta = new Map()
    this.blockHeight = 1000 // mock current block height
  }

  private isZeroAddress(addr: Principal): boolean {
    return addr === 'SP000000000000000000002Q6VF78'
  }

  public transferAdmin(caller: Principal, newAdmin: Principal) {
    if (caller !== this.admin) return { error: 100 }
    if (this.isZeroAddress(newAdmin)) return { error: 101 }
    this.admin = newAdmin
    return { value: true }
  }

  public mint(caller: Principal, title: string, ipfsHash: string) {
    if (this.isZeroAddress(caller)) return { error: 101 }
    const id = this.tokenCounter
    this.tokenOwner.set(id, caller)
    this.tokenMeta.set(id, {
      title,
      ipfsHash,
      createdAt: this.blockHeight
    })
    this.tokenCounter += 1
    return { value: id }
  }

  public transfer(caller: Principal, tokenId: number, to: Principal) {
    const owner = this.tokenOwner.get(tokenId)
    if (owner === undefined) return { error: 103 }
    if (this.isZeroAddress(to)) return { error: 101 }
    if (caller !== owner) return { error: 104 }
    this.tokenOwner.set(tokenId, to)
    return { value: true }
  }

  public getTokenOwner(tokenId: number) {
    const owner = this.tokenOwner.get(tokenId)
    if (owner === undefined) return { error: 103 }
    return { value: owner }
  }

  public getTokenMeta(tokenId: number) {
    const meta = this.tokenMeta.get(tokenId)
    if (meta === undefined) return { error: 103 }
    return { value: meta }
  }

  public getAdmin() {
    return { value: this.admin }
  }

  public getTotalSupply() {
    return { value: this.tokenCounter }
  }
}

describe("Content NFT Contract (Inkproof)", () => {
  let contract: MockContentNFT
  const admin = "ST1ADMIN123"
  const user1 = "ST2USER456"
  const user2 = "ST3USER789"

  beforeEach(() => {
    contract = new MockContentNFT(admin)
  })

  it("should mint a new content NFT", () => {
    const result = contract.mint(user1, "Title A", "Qm123...")
    expect(result).toEqual({ value: 0 })
    const owner = contract.getTokenOwner(0)
    expect(owner).toEqual({ value: user1 })
    const meta = contract.getTokenMeta(0)
    expect(meta.value.title).toBe("Title A")
    expect(meta.value.ipfsHash).toBe("Qm123...")
  })

  it("should fail to mint from zero address", () => {
    const zero = "SP000000000000000000002Q6VF78"
    const result = contract.mint(zero, "Bad", "Hash")
    expect(result).toEqual({ error: 101 })
  })

  it("should allow token transfer by owner", () => {
    contract.mint(user1, "Title B", "Qm456...")
    const result = contract.transfer(user1, 0, user2)
    expect(result).toEqual({ value: true })
    const newOwner = contract.getTokenOwner(0)
    expect(newOwner).toEqual({ value: user2 })
  })

  it("should reject transfer from non-owner", () => {
    contract.mint(user1, "Title C", "Qm789...")
    const result = contract.transfer(user2, 0, user1)
    expect(result).toEqual({ error: 104 })
  })

  it("should transfer admin rights", () => {
    const result = contract.transferAdmin(admin, user2)
    expect(result).toEqual({ value: true })
    const newAdmin = contract.getAdmin()
    expect(newAdmin).toEqual({ value: user2 })
  })

  it("should reject admin transfer by non-admin", () => {
    const result = contract.transferAdmin(user1, user2)
    expect(result).toEqual({ error: 100 })
  })

  it("should get total supply after minting", () => {
    contract.mint(user1, "T1", "H1")
    contract.mint(user1, "T2", "H2")
    const result = contract.getTotalSupply()
    expect(result).toEqual({ value: 2 })
  })
})
