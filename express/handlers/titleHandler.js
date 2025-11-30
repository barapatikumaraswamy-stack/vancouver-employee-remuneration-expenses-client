import express from "express";
import {
  dbinsertTitle,
  dbGetTitleById,
  dbGetAllTitles,
  dbGetSimilarTitles,
} from "../db/titles.js";

const insertTitle = (req, res) => {
  const { titleName } = req.body;
  try {
    const result = dbinsertTitle(titleName);
    res.status(201).json({ success: true, title_id: result.lastInsertRowid });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

const getTitleById = (req, res) => {
  const { id } = req.params;
  console.log("title", id);
  try {
    const title = dbGetTitleById(Number(id));
    if (title) {
      res.status(200).json(title);
    } else {
      res.status(404).json({ error: "Title not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllTitles = (req, res) => {
  const limit = req.query.limit ? Number(req.query.limit) : 100;
  const offset = req.query.offset ? Number(req.query.offset) : 0;
  try {
    const titles = dbGetAllTitles(limit, offset);

    if (titles) {
      res.status(200).json(titles);
    } else {
      res.status(404).json({ error: "Titles not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getSimilarTitles = (req, res) => {
  const { titleName } = req.query;
  const limit = req.query.limit ? Number(req.query.limit) : 100;
  const offset = req.query.offset ? Number(req.query.offset) : 0;
  try {
    const titles = dbGetSimilarTitles(titleName, limit, offset);
    if (titles) {
      res.status(200).json(titles);
    } else {
      res.status(404).json({ error: "Titles not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export { insertTitle, getTitleById, getAllTitles, getSimilarTitles };
