package example.adapter.gateway.db

import org.jetbrains.exposed.sql.Column
import org.jetbrains.exposed.sql.Table
import java.time.Instant

abstract class ExposedTable<out M>(name: String) : Table(name) {

    protected fun instant(name: String): Column<Instant> = registerColumn(
        name,
        InstantColumnType(true)
    )
}
