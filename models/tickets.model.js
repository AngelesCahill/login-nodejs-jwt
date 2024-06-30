import { db } from "../database/connection.database.js";

const findOneTicketByTid = async (tid) => {
    const query = {
        text: `SELECT * FROM tickets WHERE tid = $1`,
        values: [tid]
    };
    const { rows } = await db.query(query);
    return rows[0];
};
const updateTicket = async (tid) => {
    const query = {
        text: `UPDATE tickets 
        WHERE tid = $1 RETURNING *`,
        values: [tid]
    };
    const { rows } = await db.query(query);
    return rows[0];
};

const createTicket = async () => {
    const query = {
      text: "INSERT INTO tickets (img, description, valor, ticketname, ticketdate) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      values: [img, description, valor, ticketname, ticketdate],
    };
    const { rows } = await db.query(query);
    return rows[0];
};
const deleteTicket = async (tid) => {};

const findAllTickets = async () => {
    const query = {
      text: `SELECT * FROM tickets`
    };
    const { rows } = await db.query(query);
    console.log(rows)
    return rows;
};

export const TicketsModel = {
    createTicket,
    updateTicket,
    deleteTicket,
    findAllTickets,
    findOneTicketByTid
};