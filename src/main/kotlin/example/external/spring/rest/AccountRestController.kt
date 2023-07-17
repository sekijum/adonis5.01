package example.external.spring.rest

import example.adapter.controller.AccountController
import example.adapter.controller.resource.*
import example.adapter.controller.resource.ErrorResponse
import example.adapter.controller.resource.account.*
import io.swagger.annotations.*
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Mono

@Api("アカウントを管理するAPI", tags = ["Accounts"])
@RestController
@RequestMapping("/accounts")
class AccountRestController(private val accountController: AccountController) {

    @ApiResponses(
        value = [
            (ApiResponse(code = 200, message = "OK", response = AccountResponse::class)),
            (ApiResponse(code = 400, message = "Bad Request", response = ErrorResponse::class)),
            (ApiResponse(code = 404, message = "Not Found", response = ErrorResponse::class)),
            (ApiResponse(code = 500, message = "Internal Server Error", response = ErrorResponse::class))
        ]
    )
    @ApiOperation("アカウントを取得する")
    @GetMapping("/{accountId}")
    fun find(
        @ApiParam(value = "アカウントのID", required = true, example = "AC_c5fb2cec-a77c-4886-b997-ffc2ef060e78")
        @PathVariable accountId: String
    ): Mono<AccountResponse> {
        return accountController.find(accountId)
    }

    @ApiResponses(
        value = [
            (ApiResponse(code = 200, message = "OK", response = AccountResponses::class)),
            (ApiResponse(code = 400, message = "Bad Request", response = ErrorResponse::class)),
            (ApiResponse(code = 404, message = "Not Found", response = ErrorResponse::class)),
            (ApiResponse(code = 500, message = "Internal Server Error", response = ErrorResponse::class))
        ]
    )
    @ApiOperation("すべてのアカウントを取得する")
    @GetMapping("")
    fun findAll(
        @ModelAttribute request: AccountFindAllRequest
    ): Mono<AccountResponses> {
        return accountController.findAll(request.limit, request.offset)
    }

    @ApiResponses(
        value = [
            (ApiResponse(code = 201, message = "Created", response = AccountResponse::class)),
            (ApiResponse(code = 400, message = "Bad Request", response = ErrorResponse::class)),
            (ApiResponse(code = 404, message = "Not Found", response = ErrorResponse::class)),
            (ApiResponse(code = 500, message = "Internal Server Error", response = ErrorResponse::class))
        ]
    )
    @ApiOperation("アカウントを作成する")
    @PostMapping("", consumes = [MediaType.APPLICATION_JSON_VALUE])
    @ResponseStatus(HttpStatus.CREATED)
    fun create(
        @RequestBody request: AccountCreateRequest
    ): Mono<AccountResponse> {
        return accountController.create(
            request.name,
            request.namePronunciation,
            request.email,
            request.password
        )
    }

    @ApiResponses(
        value = [
            (ApiResponse(code = 200, message = "OK", response = AccountResponse::class)),
            (ApiResponse(code = 400, message = "Bad Request", response = ErrorResponse::class)),
            (ApiResponse(code = 404, message = "Not Found", response = ErrorResponse::class)),
            (ApiResponse(code = 409, message = "Conflict", response = ErrorResponse::class)),
            (ApiResponse(code = 500, message = "Internal Server Error", response = ErrorResponse::class))
        ]
    )
    @ApiOperation("アカウントを更新する")
    @PutMapping("/{accountId}", consumes = [MediaType.APPLICATION_JSON_VALUE])
    fun update(
        @ApiParam(value = "アカウントのID", required = true, example = "AC_c5fb2cec-a77c-4886-b997-ffc2ef060e78")
        @PathVariable accountId: String,
        @RequestBody request: AccountUpdateRequest
    ): Mono<AccountResponse> {
        return accountController.update(
            accountId,
            request.name,
            request.namePronunciation,
            request.email,
            request.password
        )
    }

    @ApiResponses(
        value = [
            (ApiResponse(code = 200, message = "OK", response = AccountResponse::class)),
            (ApiResponse(code = 400, message = "Bad Request", response = ErrorResponse::class)),
            (ApiResponse(code = 404, message = "Not Found", response = ErrorResponse::class)),
            (ApiResponse(code = 500, message = "Internal Server Error", response = ErrorResponse::class))
        ]
    )
    @ApiOperation("アカウントを削除する")
    @DeleteMapping("/{accountId}")
    fun delete(
        @ApiParam(value = "アカウントのID", required = true, example = "AC_c5fb2cec-a77c-4886-b997-ffc2ef060e78")
        @PathVariable accountId: String
    ): Mono<AccountResponse> {
        return accountController.delete(accountId)
    }
}
