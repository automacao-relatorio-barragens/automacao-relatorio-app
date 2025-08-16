# Field Mapping

This document describes how form fields map to the inspection report PDF.
Coordinates use an `(x, y)` origin from the bottom-left of the page.

| Form key | PDF label | Coordinates (x, y) | Validation |
| --- | --- | --- | --- |
| client_name | Client Name | (72, 680) | string, required |
| report_date | Report Date | (450, 680) | ISO 8601 date, required |
| equipment_id | Equipment ID | (72, 640) | alphanumeric, length 1-20, required |
| issue_summary | Issue Summary | (72, 600) | string, max 500 characters |
| resolution | Resolution | (72, 560) | string, max 500 characters |
| inspector_signature | Inspector Signature | (72, 480) | base64 image, required |

Additional fields can be added following the same pattern.
