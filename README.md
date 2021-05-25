This module used the jsonapi in Drupal to call a content type . The module also extends Drupals block base class to provide a simple search bar that filters the browser based state.

The content type is FAQ and contains title an body fields

These content types are delivered in a Bootstrap 4 accordian.

The libraries file contains a dependency to Drupal core jQuery, you will need to load in the Bootstrap css and js seperately to make this work.

The endpoint uses sparse fieldsets, full url used is "/jsonapi/node/faq?fields[node--faq]=id,drupal_internal__nid,title,body&sort=created&page[limit]=20";

Outside of the core Bootstrap classes there is no additional css.