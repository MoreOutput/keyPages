# keyPages
Generate pages that others can visit that die when the creators websocket closes

Hit the create page button and be sent to /:key a sha512 hash. A websockets connection is opened and others can visit the page via GET. Once the websocket closes the page is deleted thus the page is no longer accessible via GET.
