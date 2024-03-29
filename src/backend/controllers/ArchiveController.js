import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";

/**
 * All the routes related to Archives are present here.
 *  These are Privately accessible routes.
 * */

/**
 * This handler handles gets all archived notes in the db.
 * send GET Request at /api/archives
 * */

export const getAllArchivedNotesHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (!user) {
    return new Response(
      404,
      {},
      {
        errors: ["The email you entered is not Registered. Not Found error"],
      }
    );
  }
  return new Response(200, {}, { archives: user.archives });
};

/**
 * This handler handles deletes note from archive.
 * send DELETE Request at /api/archives/delete/:noteId
 * */

export const deleteFromArchivesHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (!user) {
    return new Response(
      404,
      {},
      {
        errors: ["The email you entered is not Registered. Not Found error"],
      }
    );
  }
  const { noteId } = request.params;
  user.archives = user.archives.filter((note) => note._id !== noteId);
  this.db.users.update({ _id: user._id }, user);
  return new Response(200, {}, { archives: user.archives });
};

/**
 * This handler handles restoring the archived notes to user notes.
 * send POST Request at /api/archives/restore/:noteId
 * */

export const restoreFromArchivesHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (!user) {
    return new Response(
      404,
      {},
      {
        errors: ["The email you entered is not Registered. Not Found error"],
      }
    );
  }
  const { noteId } = request.params;
  const restoredNote = user.archives.filter((note) => note._id === noteId)[0];
  user.archives = user.archives.filter((note) => note._id !== noteId);
  user.notes.push({ ...restoredNote });
  this.db.users.update({ _id: user._id }, user);
  return new Response(200, {}, { archives: user.archives, notes: user.notes });
};

// path:  /api//archives/trash/:noteId
export const moveArchivedToTrashHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    const { noteId } = request.params;
    const trashedNote = user.archives.filter((note) => note._id === noteId)[0];
    user.archives = user.archives.filter((note) => note._id !== noteId);
    user.trash.push({ ...trashedNote });
    this.db.users.update({ _id: user._id }, user);
    return new Response(
      201,
      {},
      { trash: user.trash, archives: user.archives }
    );
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

//Edit archived note
//send POST Request at /api/archives

export const updateArchiveHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    const { note } = JSON.parse(request.requestBody);
    const { noteId } = request.params;
    const noteIndex = user.archives.findIndex((note) => note._id === noteId);
    user.archives[noteIndex] = { ...user.archives[noteIndex], ...note };
    this.db.users.update({ _id: user._id }, user);
    return new Response(201, {}, { archives: user.archives });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};