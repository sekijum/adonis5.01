package example.external.spring

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.context.properties.ConfigurationPropertiesScan
import org.springframework.boot.runApplication
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@SpringBootApplication(scanBasePackages = ["example"])
@ConfigurationPropertiesScan(basePackages = ["example"])
class Application

fun main(args: Array<String>) {
    runApplication<Application>(*args)
}

@RestController
class SampleController {
    @GetMapping("/")
    fun root(): String {
        return "root"
    }
}