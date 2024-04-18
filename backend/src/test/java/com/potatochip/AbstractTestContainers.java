package com.potatochip;

import com.github.javafaker.Faker;
import org.flywaydb.core.Flyway;
import org.junit.jupiter.api.BeforeAll;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import javax.sql.DataSource;

import static org.assertj.core.api.Assertions.assertThat;
@Testcontainers
public abstract class AbstractTestContainers {
    @BeforeAll
    static void beforeAll() {
        Flyway flyway = Flyway.configure().dataSource(
                postgreSQLContainer.getJdbcUrl(),
                postgreSQLContainer.getUsername(),
                postgreSQLContainer.getPassword()
        ).load();
        flyway.migrate();


    }

    @Container
    protected static final PostgreSQLContainer<?> postgreSQLContainer
            = new PostgreSQLContainer<>("postgres:latest")
            .withDatabaseName("potatochip-dao-unit-test")
            .withUsername("potatochip")
            .withPassword("password");

    //maps datasource object to our testcontainers database and not the localhost database
    //aka allows us to connect our application to postgres test container instance
    @DynamicPropertySource
    private static void registerDataSourceProperties(DynamicPropertyRegistry registry){
        registry.add(
                "spring.datasource.url",
//                () -> postgreSQLContainer.getJdbcUrl() same this as line below (method reference)
                postgreSQLContainer::getJdbcUrl
        );
        registry.add(
                "spring.datasource.username",
                postgreSQLContainer::getUsername
        );
        registry.add(
                "spring.datasource.password",
                postgreSQLContainer::getPassword
        );
    }

    //creating the datasource object to inject into testcontainers test class
    //have to do this for tests since we are not using the one that is given
    //to us by the spring boot framework
    private static DataSource getDataSource(){
        return DataSourceBuilder.create()
                .driverClassName(postgreSQLContainer.getDriverClassName())
                .url(postgreSQLContainer.getJdbcUrl())
                .username(postgreSQLContainer.getUsername())
                .password(postgreSQLContainer.getPassword())
                .build();

        //        DataSourceBuilder builder = DataSourceBuilder.create()
//                .driverClassName(postgreSQLContainer.getDriverClassName())
//                .url(postgreSQLContainer.getJdbcUrl())
//                .username(postgreSQLContainer.getUsername())
//                .password(postgreSQLContainer.getPassword());

//        return builder.build();
    }

    protected static JdbcTemplate getJdbcTemplate(){
        return new JdbcTemplate(getDataSource());
    }

    protected static final Faker FAKER = new Faker();
}
