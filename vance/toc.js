document.addEventListener("DOMContentLoaded", () => {
  const toc = document.getElementById("toc");
  if (!toc) return;

  const headings = document.querySelectorAll("h1");
  if (headings.length === 0) return;

  const ul = document.createElement("ul");
  const tocLinks = [];

  headings.forEach((heading, index) => {
    // Create an ID if one doesn't already exist
    if (!heading.id) {
      heading.id = heading.textContent
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");

      // Prevent duplicate IDs
      if (document.getElementById(heading.id) !== heading) {
        heading.id += "-" + index;
      }
    }

    const li = document.createElement("li");

    const a = document.createElement("a");
    a.href = "#" + heading.id;
    a.textContent = heading.textContent;

    li.appendChild(a);
    ul.appendChild(li);

    tocLinks.push({
      heading: heading,
      link: a,
    });
  });

  toc.appendChild(ul);

  // Highlight current section while scrolling
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          tocLinks.forEach((item) => item.link.classList.remove("active"));

          const current = tocLinks.find(
            (item) => item.heading === entry.target,
          );
          if (current) {
            current.link.classList.add("active");
          }
        }
      });
    },
    {
      rootMargin: "-20% 0px -70% 0px",
    },
  );

  tocLinks.forEach((item) => observer.observe(item.heading));
});
