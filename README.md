# SkaiCloud Commerce Marketplace

First-party SkaiCloud Website Studio module for creating and publishing product storefronts.

## Module

- Module key: `commerce_marketplace`
- Dashboard: `/dashboard/storefront`
- Public catalogue: `/marketplace`
- Required module: `website`
- Runtime: sandboxed iframe

The host platform owns product persistence, image storage, authentication, entitlements, and
Stripe checkout. This repository contains the reviewable module package and its metadata only.

## Validate

From the repository root:

```bash
node ../SkaiCloud\ Network\ Solution\ Platform/scripts/validate-module.mjs .
```

The platform currently accepts modules through metadata review and install dry-run. Runtime
installation remains controlled by the platform release policy.
