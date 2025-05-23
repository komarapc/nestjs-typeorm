import * as bcrypt from 'bcrypt';

import {
  responseBadRequest,
  responseInternalServerError,
} from './response-api';

import { customAlphabet } from 'nanoid';
import { v7 } from 'uuid';
import { z } from 'zod';

function zodErrorParse(error: any) {
  let isError = false;
  let errors: { name: string; message: string }[] = [];
  if (error instanceof z.ZodError) {
    isError = true;
    const formattedErrors = error.errors.map((err) => ({
      name: err.path.join('.'),
      message: err.message,
    }));
    errors = formattedErrors;
  }
  return { isError, errors };
}

function generateId() {
  return v7();
}

function createHash(text: string) {
  return bcrypt.hashSync(text, Number(process.env.SALT_ROUNDS) || 12);
}
function compareHash(text: string, hash: string) {
  return bcrypt.compareSync(text, hash);
}

function uniqueCodeUppercase(length = 6) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return customAlphabet(characters, 10)(length).toUpperCase();
}
export type MetaPagination = {
  page: number;
  total: number;
  limit: number;
};
type Link = { label: string; url: string | null };
type MetaLink = {
  first_page_link: string;
  last_page_link: string;
  next_page_link: string | null;
  prev_page_link: string | null;
  links: Link[];
};
export type Meta = {
  current_page: number;
  total_data: number;
  total_page: number;
  per_page: number;
};
function metaPagination({ page, total, limit }: MetaPagination): Meta {
  const totalPage = Math.ceil(total / limit);
  return {
    current_page: page,
    total_data: total,
    total_page: totalPage,
    per_page: limit,
  };
}

const safeInputTextRegex = /^[a-zA-Z0-9_]+$/;
const safeInputNumberRegex = /^[0-9]+$/;
const onlySpecialCharsRegex = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/;
const regexPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;

const getErrorResponse = (error: any) => {
  const message = error.message || 'Unknown error';
  const zodErr = zodErrorParse(error);
  if (zodErr.isError) return responseBadRequest({ error: zodErr.errors });
  return responseInternalServerError({ message });
};

export {
  safeInputNumberRegex,
  safeInputTextRegex,
  onlySpecialCharsRegex,
  regexPassword,
  zodErrorParse,
  generateId,
  createHash,
  compareHash,
  uniqueCodeUppercase,
  metaPagination,
  getErrorResponse,
};
