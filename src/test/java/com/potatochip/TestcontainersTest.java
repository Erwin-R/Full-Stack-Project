package com.potatochip;

import org.junit.jupiter.api.Test;
import org.testcontainers.junit.jupiter.Testcontainers;

import static org.assertj.core.api.Assertions.assertThat;

@Testcontainers
public class TestcontainersTest extends AbstractTestContainers {
    @Test
    void canStartPostgresDB() {
        assertThat(postgreSQLContainer.isRunning()).isTrue();
        assertThat(postgreSQLContainer.isCreated()).isTrue();
    }
}

//    //creates testcontainer used for unit tests
//    @Container
//    private static final PostgreSQLContainer<?> postgreSQLContainer
//            = new PostgreSQLContainer<>("postgres:latest")
//            .withDatabaseName("potatochip-dao-unit-test")
//            .withUsername("potatochip")
//            .withPassword("password");
//
//    //maps datasource object to our testcontainers database and not the localhost database
//    //aka allows us to connect our application to postgres test continer instance
//    @DynamicPropertySource
//    private static void registerDataSourceProperties(DynamicPropertyRegistry registry){
//        registry.add(
//                "spring.datasource.url",
////                () -> postgreSQLContainer.getJdbcUrl() same this as line below (method reference)
//                postgreSQLContainer::getJdbcUrl
//        );
//        registry.add(
//                "spring.datasource.username",
//                postgreSQLContainer::getUsername
//        );
//        registry.add(
//                "spring.datasource.password",
//                postgreSQLContainer::getPassword
//        );
//    }
//
//    @Test
//    void canStartPostgresDB() {
//        assertThat(postgreSQLContainer.isRunning()).isTrue();
//        assertThat(postgreSQLContainer.isCreated()).isTrue();
//    }
//
//    //applies our flyway migrations to test container so we can create tables and apply changes
//    //we've made to those tables
//    @Test
//    void canApplyDbMigrateWithFlyway() {
//        Flyway flyway = Flyway.configure().dataSource(
//                postgreSQLContainer.getJdbcUrl(),
//                postgreSQLContainer.getUsername(),
//                postgreSQLContainer.getPassword()
//        ).load();
//        flyway.migrate();
//        System.out.println();
//    }
