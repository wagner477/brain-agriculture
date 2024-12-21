import { Request, Response } from 'express';

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

const prismaExceptionStatusMap = {
  P2000: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'An unexpected error occurred. Please try again later.',
  },
  P2001: {
    status: HttpStatus.BAD_REQUEST,
    message: 'Record does not match stored type.',
  },
  P2002: {
    status: HttpStatus.BAD_REQUEST,
    message: 'A unique constraint violation occurred.',
  },
  P2003: {
    status: HttpStatus.NOT_FOUND,
    message: 'The requested record was not found.',
  },
  P2004: {
    status: HttpStatus.BAD_REQUEST,
    message: 'A constraint failed on the database.',
  },
  P2005: { status: HttpStatus.BAD_REQUEST, message: 'Value out of range.' },
  P2006: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'An internal error occurred.',
  },
  P2007: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'An internal error occurred.',
  },
  P2008: { status: HttpStatus.BAD_REQUEST, message: 'Validation failed.' },
  P2009: {
    status: HttpStatus.BAD_REQUEST,
    message: 'Referential integrity constraint violation.',
  },
  P2010: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'An internal error occurred.',
  },
  P2011: { status: HttpStatus.BAD_REQUEST, message: 'Data validation error.' },
  P2012: {
    status: HttpStatus.BAD_REQUEST,
    message: 'Missing a required value.',
  },
  P2013: { status: HttpStatus.BAD_REQUEST, message: 'Invalid function input.' },
  P2014: { status: HttpStatus.BAD_REQUEST, message: 'Record not found.' },
  P2015: { status: HttpStatus.BAD_REQUEST, message: 'Unsupported feature.' },
  P2016: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'An internal error occurred.',
  },
  P2017: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'An internal error occurred.',
  },
  P2018: { status: HttpStatus.BAD_REQUEST, message: 'Transaction API error.' },
  P2019: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'An internal error occurred.',
  },
  P2020: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'An internal error occurred.',
  },
  P2021: {
    status: HttpStatus.BAD_REQUEST,
    message: 'Model validation failed.',
  },
  P2022: { status: HttpStatus.BAD_REQUEST, message: 'Invalid data model.' },
  P2023: { status: HttpStatus.BAD_REQUEST, message: 'Migration error.' },
  P2024: { status: HttpStatus.BAD_REQUEST, message: 'Schema parser error.' },
  P2025: {
    status: HttpStatus.NOT_FOUND,
    message: 'The requested record could not be found in the database.',
  },
  P2026: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'An internal error occurred.',
  },
  P2030: {
    status: HttpStatus.BAD_REQUEST,
    message: 'Unsupported database feature.',
  },
  P2031: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'An internal error occurred.',
  },
  P2032: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'An internal error occurred.',
  },
  P2033: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'An internal error occurred.',
  },
  P2034: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'An internal error occurred.',
  },
};

function getHttpStatusFromPrismaException(
  exception: Prisma.PrismaClientKnownRequestError,
): {
  status: number;
  message: string;
} {
  return (
    prismaExceptionStatusMap[exception.code] || {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'An unexpected error occurred.',
    }
  );
}

@Catch(Prisma.PrismaClientKnownRequestError)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const { status, message } = getHttpStatusFromPrismaException(exception);
    const errorMessage = exception.message;
    const stackTrace = exception.stack;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      errorMessage,
      friendlyMessage: message,
      stackTrace,
    });

    console.error(
      `PrismaClientKnownRequestError: ${errorMessage}\n${stackTrace}`,
    );
  }
}
