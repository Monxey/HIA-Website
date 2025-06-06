class MyHeader extends HTMLElement {
  connectedCallback() {
    fetch("header.html")
      .then(res => {
        if (!res.ok) throw new Error("Failed to load header.html");
        return res.text();
      })
      .then(html => {
        this.innerHTML = html;
        this.style.display = "block";  // Show once loaded
      })
      .catch(err => {
        console.error("Header load error:", err);
        this.innerHTML = "<p>Error loading header.</p>";
        this.style.display = "block";  // Still show fallback
      });
  }
}
customElements.define("my-header", MyHeader);
