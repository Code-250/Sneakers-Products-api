import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  getGenericResponseSchema,
  getGenericErrorResponseSchema,
} from '../utils/swagger.util';

/**
 *  Custom implementation of API operations
 * @param summary description of operation
 * @returns @ApiOperation
 */
export const Operation = (summary: string) => {
  return applyDecorators(
    ApiOperation({
      summary,
    }),
  );
};

/**
 * Implementation of ApiResponse for OK responses
 * @param model operation to be returned
 * @returns @ApiResponse
 */
export const OkResponse = (model: any) => {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.OK,
      description: 'success',
      ...getGenericResponseSchema(model),
    }),
  );
};

/**
 * Implementation for ApiCreatedResponse for created Model
 * @param model operation to be returned
 * @returns @ApiCreatedResponse
 */

export const CreatedResponse = (model: any) => {
  return applyDecorators(
    ApiCreatedResponse({
      ...getGenericResponseSchema(model),
    }),
  );
};

/**
 *  custom response for Forbidden Responses
 * @returns @ApiForbiddenResponse
 */
export const ForbiddenRespose = () => {
  return applyDecorators(
    ApiForbiddenResponse({
      description: 'Forbidden resource',
    }),
  );
};

/**
 * Combines error decorators for swagger and return a custom response
 * @param errorResponse
 * @returns Wrapper combining all decorators errors
 */

export const ErrorResponse = (...errorResponse: any[]) => {
  return applyDecorators(
    ApiResponse({
      description: 'error Response',
      ...getGenericErrorResponseSchema(),
    }),
    ...errorResponse.map((e) => e()),
  );
};

/**
 * Custom response for Bad Request response
 * @returns @ApiRequestResponse
 */
export const BadRequestResponse = () => {
  return applyDecorators(
    ApiBadRequestResponse({
      description: 'Invalid Request',
    }),
  );
};

/**
 * Custom response for unauthorized responses
 * @returns @ApiUnauthorizedResponse
 */
export const UnAuthorizedResponse = () => {
  return applyDecorators(
    ApiUnauthorizedResponse({
      description: 'UnAuthorized request',
    }),
  );
};

/**
 * Custom response for conflict response
 * @returns @ApiConflictResponse
 */
export const ConflictResponse = () => {
  return applyDecorators(
    ApiConflictResponse({
      description: 'conflict response',
    }),
  );
};

/**
 * custom response for swagger in not found resources
 * @returns @ApiNotFoundResponse
 */
export const NotfoundResponse = () => {
  return applyDecorators(
    ApiNotFoundResponse({
      description: 'Resource Not found',
    }),
  );
};
