/**
 * Placeholder for the hosted diff API service.
 *
 * The real implementation would start an HTTP server exposing `diffDoc` over a
 * secured endpoint. For now this simply returns the string ``"started"`` so
 * integration tests can verify the hook is callable.
 */
export function startDiffServer(): string {
  return 'started'
}
