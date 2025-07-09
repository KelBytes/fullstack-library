CREATE INDEX "search_index" ON "books" USING gin ((
      setweight(to_tsvector("english", "title"), "A") ||
      setweight(to_tsvector("english", "author"), "B") ||
      setweight(to_tsvector("english", "genre"), "C")
      ));