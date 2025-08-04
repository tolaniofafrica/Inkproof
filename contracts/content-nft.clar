;; Content NFT Contract for Inkproof
;; Clarity v2

(define-constant ERR-NOT-AUTHORIZED u100)
(define-constant ERR-ZERO-ADDRESS u101)
(define-constant ERR-TOKEN-EXISTS u102)
(define-constant ERR-TOKEN-NOT-FOUND u103)
(define-constant ERR-NOT-OWNER u104)

(define-data-var admin principal tx-sender)
(define-data-var token-counter uint u0)

;; token-id -> metadata
(define-map token-owner uint principal)
(define-map token-meta uint (tuple (
  title (string-utf8 128)
  ipfs-hash (string-utf8 128)
  created-at uint
)))

(define-private (is-admin (who principal))
  (is-eq who (var-get admin))
)

(define-public (transfer-admin (new-admin principal))
  (begin
    (asserts! (is-admin tx-sender) (err ERR-NOT-AUTHORIZED))
    (asserts! (not (is-eq new-admin 'SP000000000000000000002Q6VF78)) (err ERR-ZERO-ADDRESS))
    (var-set admin new-admin)
    (ok true)
  )
)

(define-public (mint (title (string-utf8 128)) (ipfs-hash (string-utf8 128)))
  (begin
    (asserts! (not (is-eq tx-sender 'SP000000000000000000002Q6VF78)) (err ERR-ZERO-ADDRESS))
    (let ((id (var-get token-counter)))
      (map-set token-owner id tx-sender)
      (map-set token-meta id (tuple (title title) (ipfs-hash ipfs-hash) (created-at (block-height))))
      (var-set token-counter (+ id u1))
      (ok id)
    )
  )
)

(define-public (transfer (token-id uint) (to principal))
  (begin
    (asserts! (map-get? token-owner token-id) (err ERR-TOKEN-NOT-FOUND))
    (asserts! (not (is-eq to 'SP000000000000000000002Q6VF78)) (err ERR-ZERO-ADDRESS))
    (let ((current (unwrap! (map-get? token-owner token-id) (err ERR-TOKEN-NOT-FOUND))))
      (asserts! (is-eq current tx-sender) (err ERR-NOT-OWNER))
      (map-set token-owner token-id to)
      (ok true)
    )
  )
)

(define-read-only (get-token-owner (token-id uint))
  (match (map-get? token-owner token-id)
    owner (ok owner)
    (err ERR-TOKEN-NOT-FOUND)
  )
)

(define-read-only (get-token-meta (token-id uint))
  (match (map-get? token-meta token-id)
    meta (ok meta)
    (err ERR-TOKEN-NOT-FOUND)
  )
)

(define-read-only (get-admin)
  (ok (var-get admin))
)

(define-read-only (get-total-supply)
  (ok (var-get token-counter))
)
