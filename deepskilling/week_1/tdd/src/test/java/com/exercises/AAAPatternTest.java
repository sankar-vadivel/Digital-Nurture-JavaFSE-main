package com.exercises;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.assertEquals;

public class AAAPatternTest {
    private Calculator calculator;

    @Before
    public void setUp() {
        calculator = new Calculator();
    }

    @Test
    public void testSubtract() {
        int a = 10;
        int b = 4;
        
        int result = calculator.subtract(a, b);
        
        assertEquals(6, result);
    }

    @After
    public void tearDown() {
        calculator = null;
    }
}
