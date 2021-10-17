#include <stdio.h>

#define MAX_SIZE 10
int stack[MAX_SIZE];
int top;

void init()
{
  top = -1;
}

int push(int val)
{
  if (top>=MAX_SIZE-1) {
    printf("stack overflow\n");
    return -1;
  }
  stack[++top] = val;
  return val;
}

int pop(void)
{
  if(top<0) {
    printf("stack underflow\n");
    return -1;
  }
  return stack[top--];
}

void print_stack()
{
  int i;
  printf("in stack..");
  for(i=top; i>=0; i--) {
    printf("%d", stack[i]);
  }
  printf("\n");
}

int main()
{
  int i;
  int item;

  init();
  for(i=1; i<=10; i++) {
    push(i);
  }
  print_stack();
  item = pop();
  printf("pop item is %d\n", item);
  print_stack();
  return 0
}
